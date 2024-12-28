export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
      };
      teams: {
        Row: {
          id: string;
          name: string;
          created_by: string;
          created_at: string;
          updated_at: string;
        };
      };
      hackers: {
        Row: {
          id: string;
          name: string;
          email: string;
          team_id: string | null;
          created_by: string;
          created_at: string;
          updated_at: string;
          share_token: string;
        };
      };
      calendar_events: {
        Row: {
          id: string;
          title: string;
          start_date: string;
          end_date: string;
          description: string | null;
          created_by: string;
          created_at: string;
          updated_at: string;
        };
      };
    };
  };
}