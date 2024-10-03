

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


CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";






COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE TYPE "public"."order_state" AS ENUM (
    'pending',
    'processing',
    'shipped',
    'delivered',
    'cancelled'
);


ALTER TYPE "public"."order_state" OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."accommodations" (
    "id" bigint NOT NULL,
    "name" "text" NOT NULL,
    "location" "text" NOT NULL,
    "qr_code" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "created_by" bigint,
    "updated_by" bigint
);


ALTER TABLE "public"."accommodations" OWNER TO "postgres";


ALTER TABLE "public"."accommodations" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "public"."accommodations_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."admin_users" (
    "id" bigint NOT NULL,
    "username" "text" NOT NULL,
    "email" "text" NOT NULL,
    "password_hash" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "avatar_url" "text"
);


ALTER TABLE "public"."admin_users" OWNER TO "postgres";


ALTER TABLE "public"."admin_users" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "public"."admin_users_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."customers" (
    "id" bigint NOT NULL,
    "name" "text" NOT NULL,
    "email" "text" NOT NULL,
    "phone" "text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "created_by" bigint,
    "updated_by" bigint
);


ALTER TABLE "public"."customers" OWNER TO "postgres";


ALTER TABLE "public"."customers" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "public"."customers_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."order_tastings" (
    "id" bigint NOT NULL,
    "order_id" bigint NOT NULL,
    "tasting_id" bigint NOT NULL,
    "quantity" integer NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "created_by" bigint,
    "updated_by" bigint
);


ALTER TABLE "public"."order_tastings" OWNER TO "postgres";


ALTER TABLE "public"."order_tastings" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "public"."order_tastings_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."orders" (
    "id" bigint NOT NULL,
    "customer_id" bigint NOT NULL,
    "order_date" timestamp with time zone DEFAULT "now"(),
    "total_amount" numeric(10,2) NOT NULL,
    "state" "public"."order_state" DEFAULT 'pending'::"public"."order_state",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "created_by" bigint,
    "updated_by" bigint,
    "created_by_customer" bigint
);


ALTER TABLE "public"."orders" OWNER TO "postgres";


ALTER TABLE "public"."orders" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "public"."orders_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."payments" (
    "id" bigint NOT NULL,
    "order_id" bigint NOT NULL,
    "payment_date" timestamp with time zone DEFAULT "now"(),
    "amount" numeric(10,2) NOT NULL,
    "payment_method" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "created_by" bigint,
    "updated_by" bigint
);


ALTER TABLE "public"."payments" OWNER TO "postgres";


ALTER TABLE "public"."payments" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "public"."payments_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."settings" (
    "id" bigint NOT NULL,
    "setting_name" "text" NOT NULL,
    "setting_value" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "created_by" bigint,
    "updated_by" bigint
);


ALTER TABLE "public"."settings" OWNER TO "postgres";


ALTER TABLE "public"."settings" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "public"."settings_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."tastings" (
    "id" bigint NOT NULL,
    "name" "text" NOT NULL,
    "description" "text",
    "price" numeric(10,2),
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "created_by" bigint,
    "updated_by" bigint
);


ALTER TABLE "public"."tastings" OWNER TO "postgres";


ALTER TABLE "public"."tastings" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "public"."tastings_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."wine_tastings" (
    "id" bigint NOT NULL,
    "wine_id" bigint NOT NULL,
    "tasting_id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "created_by" bigint,
    "updated_by" bigint
);


ALTER TABLE "public"."wine_tastings" OWNER TO "postgres";


ALTER TABLE "public"."wine_tastings" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "public"."wine_tastings_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."wines" (
    "id" bigint NOT NULL,
    "name" "text" NOT NULL,
    "tasting_id" bigint NOT NULL,
    "description" "text",
    "price" numeric(10,2),
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "created_by" bigint,
    "updated_by" bigint
);


ALTER TABLE "public"."wines" OWNER TO "postgres";


ALTER TABLE "public"."wines" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "public"."wines_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



ALTER TABLE ONLY "public"."accommodations"
    ADD CONSTRAINT "accommodations_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."accommodations"
    ADD CONSTRAINT "accommodations_qr_code_key" UNIQUE ("qr_code");



ALTER TABLE ONLY "public"."admin_users"
    ADD CONSTRAINT "admin_users_email_key" UNIQUE ("email");



ALTER TABLE ONLY "public"."admin_users"
    ADD CONSTRAINT "admin_users_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."admin_users"
    ADD CONSTRAINT "admin_users_username_key" UNIQUE ("username");



ALTER TABLE ONLY "public"."customers"
    ADD CONSTRAINT "customers_email_key" UNIQUE ("email");



ALTER TABLE ONLY "public"."customers"
    ADD CONSTRAINT "customers_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."order_tastings"
    ADD CONSTRAINT "order_tastings_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."orders"
    ADD CONSTRAINT "orders_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."payments"
    ADD CONSTRAINT "payments_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."settings"
    ADD CONSTRAINT "settings_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."settings"
    ADD CONSTRAINT "settings_setting_name_key" UNIQUE ("setting_name");



ALTER TABLE ONLY "public"."tastings"
    ADD CONSTRAINT "tastings_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."wine_tastings"
    ADD CONSTRAINT "wine_tastings_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."wines"
    ADD CONSTRAINT "wines_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."accommodations"
    ADD CONSTRAINT "accommodations_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."admin_users"("id");



ALTER TABLE ONLY "public"."accommodations"
    ADD CONSTRAINT "accommodations_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "public"."admin_users"("id");



ALTER TABLE ONLY "public"."customers"
    ADD CONSTRAINT "customers_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."admin_users"("id");



ALTER TABLE ONLY "public"."customers"
    ADD CONSTRAINT "customers_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "public"."admin_users"("id");



ALTER TABLE ONLY "public"."order_tastings"
    ADD CONSTRAINT "order_tastings_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."admin_users"("id");



ALTER TABLE ONLY "public"."order_tastings"
    ADD CONSTRAINT "order_tastings_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id");



ALTER TABLE ONLY "public"."order_tastings"
    ADD CONSTRAINT "order_tastings_tasting_id_fkey" FOREIGN KEY ("tasting_id") REFERENCES "public"."tastings"("id");



ALTER TABLE ONLY "public"."order_tastings"
    ADD CONSTRAINT "order_tastings_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "public"."admin_users"("id");



ALTER TABLE ONLY "public"."orders"
    ADD CONSTRAINT "orders_created_by_customer_fkey" FOREIGN KEY ("created_by_customer") REFERENCES "public"."customers"("id");



ALTER TABLE ONLY "public"."orders"
    ADD CONSTRAINT "orders_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."admin_users"("id");



ALTER TABLE ONLY "public"."orders"
    ADD CONSTRAINT "orders_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "public"."customers"("id");



ALTER TABLE ONLY "public"."orders"
    ADD CONSTRAINT "orders_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "public"."admin_users"("id");



ALTER TABLE ONLY "public"."payments"
    ADD CONSTRAINT "payments_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."admin_users"("id");



ALTER TABLE ONLY "public"."payments"
    ADD CONSTRAINT "payments_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "public"."orders"("id");



ALTER TABLE ONLY "public"."payments"
    ADD CONSTRAINT "payments_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "public"."admin_users"("id");



ALTER TABLE ONLY "public"."settings"
    ADD CONSTRAINT "settings_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."admin_users"("id");



ALTER TABLE ONLY "public"."settings"
    ADD CONSTRAINT "settings_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "public"."admin_users"("id");



ALTER TABLE ONLY "public"."tastings"
    ADD CONSTRAINT "tastings_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."admin_users"("id");



ALTER TABLE ONLY "public"."tastings"
    ADD CONSTRAINT "tastings_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "public"."admin_users"("id");



ALTER TABLE ONLY "public"."wine_tastings"
    ADD CONSTRAINT "wine_tastings_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."admin_users"("id");



ALTER TABLE ONLY "public"."wine_tastings"
    ADD CONSTRAINT "wine_tastings_tasting_id_fkey" FOREIGN KEY ("tasting_id") REFERENCES "public"."tastings"("id");



ALTER TABLE ONLY "public"."wine_tastings"
    ADD CONSTRAINT "wine_tastings_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "public"."admin_users"("id");



ALTER TABLE ONLY "public"."wine_tastings"
    ADD CONSTRAINT "wine_tastings_wine_id_fkey" FOREIGN KEY ("wine_id") REFERENCES "public"."wines"("id");



ALTER TABLE ONLY "public"."wines"
    ADD CONSTRAINT "wines_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."admin_users"("id");



ALTER TABLE ONLY "public"."wines"
    ADD CONSTRAINT "wines_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "public"."admin_users"("id");





ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";



































































































































































































GRANT ALL ON TABLE "public"."accommodations" TO "anon";
GRANT ALL ON TABLE "public"."accommodations" TO "authenticated";
GRANT ALL ON TABLE "public"."accommodations" TO "service_role";



GRANT ALL ON SEQUENCE "public"."accommodations_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."accommodations_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."accommodations_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."admin_users" TO "anon";
GRANT ALL ON TABLE "public"."admin_users" TO "authenticated";
GRANT ALL ON TABLE "public"."admin_users" TO "service_role";



GRANT ALL ON SEQUENCE "public"."admin_users_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."admin_users_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."admin_users_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."customers" TO "anon";
GRANT ALL ON TABLE "public"."customers" TO "authenticated";
GRANT ALL ON TABLE "public"."customers" TO "service_role";



GRANT ALL ON SEQUENCE "public"."customers_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."customers_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."customers_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."order_tastings" TO "anon";
GRANT ALL ON TABLE "public"."order_tastings" TO "authenticated";
GRANT ALL ON TABLE "public"."order_tastings" TO "service_role";



GRANT ALL ON SEQUENCE "public"."order_tastings_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."order_tastings_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."order_tastings_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."orders" TO "anon";
GRANT ALL ON TABLE "public"."orders" TO "authenticated";
GRANT ALL ON TABLE "public"."orders" TO "service_role";



GRANT ALL ON SEQUENCE "public"."orders_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."orders_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."orders_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."payments" TO "anon";
GRANT ALL ON TABLE "public"."payments" TO "authenticated";
GRANT ALL ON TABLE "public"."payments" TO "service_role";



GRANT ALL ON SEQUENCE "public"."payments_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."payments_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."payments_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."settings" TO "anon";
GRANT ALL ON TABLE "public"."settings" TO "authenticated";
GRANT ALL ON TABLE "public"."settings" TO "service_role";



GRANT ALL ON SEQUENCE "public"."settings_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."settings_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."settings_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."tastings" TO "anon";
GRANT ALL ON TABLE "public"."tastings" TO "authenticated";
GRANT ALL ON TABLE "public"."tastings" TO "service_role";



GRANT ALL ON SEQUENCE "public"."tastings_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."tastings_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."tastings_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."wine_tastings" TO "anon";
GRANT ALL ON TABLE "public"."wine_tastings" TO "authenticated";
GRANT ALL ON TABLE "public"."wine_tastings" TO "service_role";



GRANT ALL ON SEQUENCE "public"."wine_tastings_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."wine_tastings_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."wine_tastings_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."wines" TO "anon";
GRANT ALL ON TABLE "public"."wines" TO "authenticated";
GRANT ALL ON TABLE "public"."wines" TO "service_role";



GRANT ALL ON SEQUENCE "public"."wines_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."wines_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."wines_id_seq" TO "service_role";



ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";






























RESET ALL;
