import { createClient } from '@supabase/supabase-js';


// Initialize database client
const supabaseUrl = 'https://clomvizbcuaisynzuqnq.databasepad.com';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImFjYzQ2OTVlLWQ3MDgtNGQ3My04ODUxLWJlODM3ODBkM2Q3MSJ9.eyJwcm9qZWN0SWQiOiJjbG9tdml6YmN1YWlzeW56dXFucSIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzY1MDUyMTY3LCJleHAiOjIwODA0MTIxNjcsImlzcyI6ImZhbW91cy5kYXRhYmFzZXBhZCIsImF1ZCI6ImZhbW91cy5jbGllbnRzIn0.NnwdIgtB0SY2K33_cXVI47DD9KnvQZfa5dfBZKvUTTo';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };