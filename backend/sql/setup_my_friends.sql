-- ============================================================
-- 1. Crear tabla my_friends
-- ============================================================
CREATE TABLE IF NOT EXISTS my_friends (
  id     SERIAL PRIMARY KEY,
  name   VARCHAR(100) NOT NULL,
  gender VARCHAR(20)  NOT NULL
);

-- ============================================================
-- 2. Insertar filas de ejemplo
-- ============================================================
INSERT INTO my_friends (name, gender) VALUES
  ('Rigoberto', 'Masculino'),
  ('María',     'Femenino'),
  ('Carlos',    'Masculino'),
  ('Ana',       'Femenino'),
  ('Luis',      'Masculino'),
  ('Sofía',     'Femenino')
ON CONFLICT DO NOTHING;

-- ============================================================
-- 3. Función que emite NOTIFY con el payload JSON
-- ============================================================
CREATE OR REPLACE FUNCTION notify_my_friends_change()
RETURNS TRIGGER AS $$
DECLARE
  payload JSON;
BEGIN
  IF TG_OP = 'UPDATE' THEN
    -- Emite una notificación por cada columna que cambió
    IF OLD.name IS DISTINCT FROM NEW.name THEN
      payload := json_build_object(
        'table',     TG_TABLE_NAME,
        'operation', TG_OP,
        'column',    'name',
        'oldValue',  OLD.name,
        'newValue',  NEW.name
      );
      PERFORM pg_notify('my_friends_changes', payload::text);
    END IF;

    IF OLD.gender IS DISTINCT FROM NEW.gender THEN
      payload := json_build_object(
        'table',     TG_TABLE_NAME,
        'operation', TG_OP,
        'column',    'gender',
        'oldValue',  OLD.gender,
        'newValue',  NEW.gender
      );
      PERFORM pg_notify('my_friends_changes', payload::text);
    END IF;

  ELSIF TG_OP = 'INSERT' THEN
    payload := json_build_object(
      'table',     TG_TABLE_NAME,
      'operation', TG_OP,
      'column',    'all',
      'oldValue',  NULL,
      'newValue',  row_to_json(NEW)
    );
    PERFORM pg_notify('my_friends_changes', payload::text);

  ELSIF TG_OP = 'DELETE' THEN
    payload := json_build_object(
      'table',     TG_TABLE_NAME,
      'operation', TG_OP,
      'column',    'all',
      'oldValue',  row_to_json(OLD),
      'newValue',  NULL
    );
    PERFORM pg_notify('my_friends_changes', payload::text);
    RETURN OLD;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- 4. Crear trigger sobre my_friends
-- ============================================================
DROP TRIGGER IF EXISTS my_friends_change_trigger ON my_friends;

CREATE TRIGGER my_friends_change_trigger
AFTER INSERT OR UPDATE OR DELETE ON my_friends
FOR EACH ROW EXECUTE FUNCTION notify_my_friends_change();
