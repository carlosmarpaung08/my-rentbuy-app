import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xaeibfhxjvkozmqqkqxk.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhhZWliZmh4anZrb3ptcXFrcXhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc0OTY3NTIsImV4cCI6MjA2MzA3Mjc1Mn0.wvB0JT98u11LO9yYyQyv_SbeEhJZoJKrrn5pS3tgOzs';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
