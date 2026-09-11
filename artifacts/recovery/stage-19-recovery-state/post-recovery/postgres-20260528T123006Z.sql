--
-- PostgreSQL database cluster dump
--

\restrict 4zq3TSITOfP5f170Nj6AShnn97ziGWD6Ir5OmahzA3dnTpZFNpcgdu4ZFph6oGB

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Roles
--

CREATE ROLE coreeye;
ALTER ROLE coreeye WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:cYjiKQECxlsMpPOLCEMdQw==$lDf0WjZAMiDlMvyLwbbvmq7Y1g5XkeMKpmwOZS2BhIE=:H7HXt4Z4MLDSydCYQf6AX0S6g8NjNYDwe9Yu5DP5L+U=';

--
-- User Configurations
--








\unrestrict 4zq3TSITOfP5f170Nj6AShnn97ziGWD6Ir5OmahzA3dnTpZFNpcgdu4ZFph6oGB

--
-- Databases
--

--
-- Database "template1" dump
--

\connect template1

--
-- PostgreSQL database dump
--

\restrict jDOIPEJWafxKt6rShRtSRDG3AFhHBkS7qxspjyhPSPZWAKtpXcHMpwH9zF05TCk

-- Dumped from database version 16.14
-- Dumped by pg_dump version 16.14

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- PostgreSQL database dump complete
--

\unrestrict jDOIPEJWafxKt6rShRtSRDG3AFhHBkS7qxspjyhPSPZWAKtpXcHMpwH9zF05TCk

--
-- Database "postgres" dump
--

\connect postgres

--
-- PostgreSQL database dump
--

\restrict 1ZyAcFZoMmcMzKL8qPyIuwZ8VwDeKoqKtMfvI4nbZbiexbeUEArJzqwWtoIh2Rl

-- Dumped from database version 16.14
-- Dumped by pg_dump version 16.14

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- PostgreSQL database dump complete
--

\unrestrict 1ZyAcFZoMmcMzKL8qPyIuwZ8VwDeKoqKtMfvI4nbZbiexbeUEArJzqwWtoIh2Rl

--
-- PostgreSQL database cluster dump complete
--
