--
-- PostgreSQL database dump
--

-- Dumped from database version 10.4
-- Dumped by pg_dump version 10.4

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: boards; Type: TABLE; Schema: public; Owner: nodejs
--

CREATE TABLE public.boards (
    id bigint NOT NULL,
    name character varying NOT NULL,
    owner_id bigint NOT NULL,
    access boolean
);


ALTER TABLE public.boards OWNER TO nodejs;

--
-- Name: boards_id_seq; Type: SEQUENCE; Schema: public; Owner: nodejs
--

CREATE SEQUENCE public.boards_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.boards_id_seq OWNER TO nodejs;

--
-- Name: boards_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: nodejs
--

ALTER SEQUENCE public.boards_id_seq OWNED BY public.boards.id;


--
-- Name: tasks; Type: TABLE; Schema: public; Owner: nodejs
--

CREATE TABLE public.tasks (
    id bigint NOT NULL,
    list character varying NOT NULL,
    content character varying NOT NULL,
    board_id character varying NOT NULL,
    title character varying NOT NULL,
    "position" character varying
);


ALTER TABLE public.tasks OWNER TO nodejs;

--
-- Name: tasks_id_seq; Type: SEQUENCE; Schema: public; Owner: nodejs
--

CREATE SEQUENCE public.tasks_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.tasks_id_seq OWNER TO nodejs;

--
-- Name: tasks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: nodejs
--

ALTER SEQUENCE public.tasks_id_seq OWNED BY public.tasks.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: nodejs
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    name character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL
);


ALTER TABLE public.users OWNER TO nodejs;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: nodejs
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO nodejs;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: nodejs
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: boards id; Type: DEFAULT; Schema: public; Owner: nodejs
--

ALTER TABLE ONLY public.boards ALTER COLUMN id SET DEFAULT nextval('public.boards_id_seq'::regclass);


--
-- Name: tasks id; Type: DEFAULT; Schema: public; Owner: nodejs
--

ALTER TABLE ONLY public.tasks ALTER COLUMN id SET DEFAULT nextval('public.tasks_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: nodejs
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: boards; Type: TABLE DATA; Schema: public; Owner: nodejs
--

COPY public.boards (id, name, owner_id, access) FROM stdin;
36	Todo	2	\N
37	Some board	2	\N
38	Cat deals	2	\N
39	board	6	\N
40	board too	6	\N
41	and... board!	6	\N
42	Board	1	\N
43	Board 2	1	\N
44	Board 3	1	\N
\.


--
-- Data for Name: tasks; Type: TABLE DATA; Schema: public; Owner: nodejs
--

COPY public.tasks (id, list, content, board_id, title, "position") FROM stdin;
46	back_log	ghj	15	gfdh	1
48	back_log	Lorem ipsum dolor sit amet	36	task1	1
49	back_log	Lorem ipsum dolor sit amet	36	task2	2
50	to_do	Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet	36	task3	1
51	done	Lorem ipsum dolor sit amet	36	task4	1
52	done	Lorem ipsum dolor sit amet	36	task5	2
53	done	Lorem ipsum dolor sit amet	36	task6	3
54	back_log	Lorem ipsum dolor sit ametLorem ipsum dolor sit amet	37	some task	1
55	to_do	Lorem ipsum dolor sit amet	37	some task too	1
56	done	Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet	37	another task	1
57	back_log	at 5 a.m.	38	Run	1
58	to_do	Murrrrrrrr....	38	Murrr...	1
59	done	at 5 a.m.	38	Wake up everybody	1
61	to_do	Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet	39	very big task	1
62	done	Lorem	39	tiny task	1
65	back_log	Lorem ipsum dolor sit amet	40	task?	1
66	to_do	Lorem ipsum dolor sit amet	40	task...	1
25	to_do	5555	4	555	1
45	to_do	1111	4	111	3
67	done	Lorem ipsum dolor sit amet	40	task!	1
60	back_log	Lorem ipsum dolor sit amet	39	task	1
63	back_log	Lorem ipsum dolor sit amet	39	task2	2
64	back_log	Lorem ipsum dolor sit amet	39	task3	3
76	done	Sed ut perspiciatis unde	43	task3	1
35	to_do	hgghnb	5	456	1
71	done	Sed ut perspiciatis unde	42	task4	1
73	done	Sed ut perspiciatis unde	42	task6	3
68	done	Sed ut perspiciatis unde	42	task1	2
75	back_log	Sed ut perspiciatis unde	43	task2	1
74	to_do	Sed ut perspiciatis unde	43	task1	1
44	back_log	fgh	4	fh	1
33	back_log	rrr	4	rrr	2
17	back_log	44	4	4	3
1	done	11	4	1	1
24	done	bnjjgd	4	gfdg	2
2	done	22	4	2	3
72	back_log	Sed ut perspiciatis unde	42	task5	1
77	back_log	89	42	98	2
69	to_do	Sed ut perspiciatis unde	42	task2	1
70	to_do	Sed ut perspiciatis undeSed ut perspiciatis unde	42	task3	2
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: nodejs
--

COPY public.users (id, name, email, password) FROM stdin;
1	yana	111	111
2	feliks	111	1
6	alex	1111	1
\.


--
-- Name: boards_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nodejs
--

SELECT pg_catalog.setval('public.boards_id_seq', 45, true);


--
-- Name: tasks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nodejs
--

SELECT pg_catalog.setval('public.tasks_id_seq', 78, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nodejs
--

SELECT pg_catalog.setval('public.users_id_seq', 6, true);


--
-- Name: boards boards_pkey; Type: CONSTRAINT; Schema: public; Owner: nodejs
--

ALTER TABLE ONLY public.boards
    ADD CONSTRAINT boards_pkey PRIMARY KEY (id);


--
-- Name: tasks tasks_pkey; Type: CONSTRAINT; Schema: public; Owner: nodejs
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: nodejs
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

