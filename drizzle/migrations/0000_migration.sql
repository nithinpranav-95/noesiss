CREATE TYPE public.session_mode AS ENUM ('debate','game','lesson');
CREATE TYPE public.weak_spot_type AS ENUM ('fallacy','rubric','framework');

-- Content tables
CREATE TABLE public.frameworks (id text PRIMARY KEY, name text NOT NULL, definition text, analogy text, when_to_use text, steps jsonb NOT NULL DEFAULT '[]', example text, practice_prompt text);
CREATE TABLE public.fallacies (id text PRIMARY KEY, name text NOT NULL, definition text, examples jsonb NOT NULL DEFAULT '[]', how_to_counter text);
CREATE TABLE public.topics (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), title text NOT NULL, category text, difficulty int DEFAULT 1);
CREATE TABLE public.fermi_questions (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), question text NOT NULL, answer numeric, explanation text, difficulty int DEFAULT 1);
CREATE TABLE public.mysteries (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), title text NOT NULL, scenario text, clues jsonb NOT NULL DEFAULT '[]', solution text, difficulty int DEFAULT 1);
CREATE TABLE public.chart_traps (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), title text NOT NULL, chart_data jsonb NOT NULL DEFAULT '{}', trap text, explanation text, difficulty int DEFAULT 1);
CREATE TABLE public.headline_pairs (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), headline_a text NOT NULL, headline_b text NOT NULL, correct text, explanation text, difficulty int DEFAULT 1);

DO $$ DECLARE t text; BEGIN
FOREACH t IN ARRAY ARRAY['frameworks','fallacies','topics','fermi_questions','mysteries','chart_traps','headline_pairs'] LOOP
  EXECUTE format('GRANT SELECT ON public.%I TO anon, authenticated', t);
  EXECUTE format('GRANT ALL ON public.%I TO service_role', t);
  EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', t);
  EXECUTE format('CREATE POLICY "Content is readable by everyone" ON public.%I FOR SELECT USING (true)', t);
END LOOP; END $$;

-- User tables
CREATE TABLE public.users (id uuid PRIMARY KEY, name text, created_at timestamptz NOT NULL DEFAULT now());
CREATE TABLE public.sessions (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), user_id uuid NOT NULL, mode public.session_mode NOT NULL, sub_type text, topic_id uuid REFERENCES public.topics(id) ON DELETE SET NULL, difficulty int, started_at timestamptz NOT NULL DEFAULT now(), ended_at timestamptz, transcript jsonb NOT NULL DEFAULT '[]');
CREATE TABLE public.scores (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), session_id uuid NOT NULL REFERENCES public.sessions(id) ON DELETE CASCADE, clarity numeric, evidence numeric, logic numeric, counterarguments numeric, adaptability numeric, overall numeric);
CREATE TABLE public.fallacy_events (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), session_id uuid NOT NULL REFERENCES public.sessions(id) ON DELETE CASCADE, fallacy_id text REFERENCES public.fallacies(id) ON DELETE SET NULL, quote text, "timestamp" timestamptz NOT NULL DEFAULT now());
CREATE TABLE public.framework_progress (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), user_id uuid NOT NULL, framework_id text NOT NULL REFERENCES public.frameworks(id) ON DELETE CASCADE, times_practised int NOT NULL DEFAULT 0, last_practised_at timestamptz, mastery int NOT NULL DEFAULT 0 CHECK (mastery BETWEEN 0 AND 5), UNIQUE (user_id, framework_id));
CREATE TABLE public.weak_spots (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), user_id uuid NOT NULL, type public.weak_spot_type NOT NULL, ref_id text NOT NULL, severity numeric NOT NULL DEFAULT 0, updated_at timestamptz NOT NULL DEFAULT now());

DO $$ DECLARE t text; BEGIN
FOREACH t IN ARRAY ARRAY['users','sessions','scores','fallacy_events','framework_progress','weak_spots'] LOOP
  EXECUTE format('GRANT SELECT, INSERT, UPDATE, DELETE ON public.%I TO authenticated', t);
  EXECUTE format('GRANT ALL ON public.%I TO service_role', t);
  EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY', t);
END LOOP; END $$;

CREATE POLICY "Own user row" ON public.users FOR ALL TO authenticated USING (id = auth.uid()) WITH CHECK (id = auth.uid());
CREATE POLICY "Own sessions" ON public.sessions FOR ALL TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
CREATE POLICY "Own framework progress" ON public.framework_progress FOR ALL TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
CREATE POLICY "Own weak spots" ON public.weak_spots FOR ALL TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
CREATE POLICY "Scores of own sessions" ON public.scores FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.sessions s WHERE s.id = session_id AND s.user_id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM public.sessions s WHERE s.id = session_id AND s.user_id = auth.uid()));
CREATE POLICY "Fallacy events of own sessions" ON public.fallacy_events FOR ALL TO authenticated
  USING (EXISTS (SELECT 1 FROM public.sessions s WHERE s.id = session_id AND s.user_id = auth.uid()))
  WITH CHECK (EXISTS (SELECT 1 FROM public.sessions s WHERE s.id = session_id AND s.user_id = auth.uid()));

CREATE INDEX ON public.sessions(user_id, started_at DESC);
CREATE INDEX ON public.scores(session_id);
CREATE INDEX ON public.fallacy_events(session_id);
CREATE INDEX ON public.weak_spots(user_id);