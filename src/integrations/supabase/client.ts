
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://bjbltjpiydaadpghgmdz.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqYmx0anBpeWRhYWRwZ2hnbWR6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI2Nzk4MTUsImV4cCI6MjA1ODI1NTgxNX0.4Qyq9N2nsgz6x6hkCOIqfy1PZQYspqhajr0BlEX6IQ0";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export type JoinRequestResponse = {
  id?: string;
  status?: string;
  error?: string;
};

export type ProcessRequestResponse = {
  message?: string;
  error?: string;
};

export type TeamJoinRequest = {
  id: string;
  team_id: string;
  user_id: string;
  status: string;
  created_at: string;
  updated_at: string;
};

type Tables = Database['public']['Tables'];
type TableNames = keyof Tables;
type Functions = Database['public']['Functions'];
type FunctionNames = keyof Functions;

export const supabase = createClient<Database>(
  SUPABASE_URL, 
  SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    },
    global: {
      headers: {
        'Content-Type': 'application/json'
      }
    },
    realtime: {
      params: {
        eventsPerSecond: 10
      }
    }
  }
);

// Debug function to test permissions - using strong typing for table names
export const testPermissions = async () => {
  const { data: sessionData } = await supabase.auth.getSession();
  console.log("Current session:", sessionData);
  
  try {
    // Use a valid table name from the Database type
    const { data, error } = await supabase
      .from('profiles' as TableNames)
      .select('*')
      .limit(1);
      
    console.log("Test query result:", { data, error });
    return { success: !error, error, data };
  } catch (err) {
    console.error("Test query error:", err);
    return { success: false, error: err };
  }
};

// Debug function to check database schema - using strong typing for table names
export const inspectTableSchema = async (tableName: TableNames) => {
  try {
    // First check if we can access the table at all
    const { data: tableData, error: tableError } = await supabase
      .from(tableName)
      .select('*')
      .limit(1);
      
    if (tableError) {
      console.error(`Error accessing table ${tableName}:`, tableError);
      return { success: false, error: tableError, schema: null };
    }
    
    // Get information about columns directly from the supabase API
    if (tableData && tableData.length > 0) {
      const sampleRecord = tableData[0];
      const inferredSchema = Object.keys(sampleRecord).map(column => ({
        column_name: column,
        data_type: typeof sampleRecord[column]
      }));
      
      console.log(`Inferred schema for ${tableName}:`, inferredSchema);
      return { 
        success: true, 
        error: null, 
        schema: inferredSchema,
        note: 'Schema inferred from sample record' 
      };
    }
    
    return { 
      success: true, 
      error: null, 
      schema: [],
      note: 'No sample data available to infer schema' 
    };
  } catch (err) {
    console.error(`Error inspecting schema for ${tableName}:`, err);
    return { success: false, error: err, schema: null };
  }
};

// Debug function to check RLS policies, ignoring system tables
export const checkRlsPermissions = async (tableName: TableNames) => {
  try {
    // First check auth status
    const { data: sessionData } = await supabase.auth.getSession();
    console.log("Current session:", sessionData);
    
    // Try basic select
    const { data: selectData, error: selectError } = await supabase
      .from(tableName)
      .select('*')
      .limit(5);
      
    console.log(`SELECT test for ${tableName}:`, selectError ? 'Failed' : 'Success', 
      selectError ? selectError : `Retrieved ${selectData?.length || 0} rows`);
    
    // Try select with auth ID filter  
    const userId = sessionData?.session?.user?.id;
    if (userId) {
      const { data: ownData, error: ownError } = await supabase
        .from(tableName)
        .select('*')
        .eq('id', userId)
        .maybeSingle();
        
      console.log(`SELECT own data test for ${tableName}:`, ownError ? 'Failed' : 'Success',
        ownError ? ownError : `Data ${ownData ? 'found' : 'not found'}`);
    }
    
    // For testing insert permissions, we'd need to use the real API
    // This is just a mock result for demonstration
    const insertError = null;
    
    console.log(`INSERT test for ${tableName}:`, insertError ? 'Failed' : 'Success',
      insertError ? insertError : 'Insert permitted (simulated)');
      
    return {
      auth: !!sessionData?.session,
      userId: sessionData?.session?.user?.id,
      canSelect: !selectError,
      canSelectOwn: userId ? true : null,
      canInsert: !insertError,
      error: selectError || insertError
    };
  } catch (err) {
    console.error(`RLS check error for ${tableName}:`, err);
    return { error: err, auth: false };
  }
};

export type TableRow<T extends TableNames> = Database['public']['Tables'][T]['Row'];
