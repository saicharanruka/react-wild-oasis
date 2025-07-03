import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://cvpmzukpvtoiuwvvdxtw.supabase.co";
const supabaseKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2cG16dWtwdnRvaXV3dnZkeHR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0NTkyNzMsImV4cCI6MjA2NzAzNTI3M30.xmVxKF1VuPuXnfEG5NxYwtq-UulFXSvUvGD-7cbnJXI";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
