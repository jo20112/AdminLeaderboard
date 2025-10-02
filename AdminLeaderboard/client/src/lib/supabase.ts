import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ajfoxeejixeucwnhwuxu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqZm94ZWVqaXhldWN3bmh3dXh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkzMTM5OTksImV4cCI6MjA3NDg4OTk5OX0.JeHU-sIkQFxdKieAYy9Vs7eOh6i6gQ51snavcl4tpCU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
