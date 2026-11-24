export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.18"
  }
  public: {
    Tables: {
      chart_traps: {
        Row: {
          chart_data: Json
          difficulty: number | null
          explanation: string | null
          id: string
          title: string
          trap: string | null
        }
        Insert: {
          chart_data?: Json
          difficulty?: number | null
          explanation?: string | null
          id?: string
          title: string
          trap?: string | null
        }
        Update: {
          chart_data?: Json
          difficulty?: number | null
          explanation?: string | null
          id?: string
          title?: string
          trap?: string | null
        }
        Relationships: []
      }
      fallacies: {
        Row: {
          definition: string | null
          examples: Json
          how_to_counter: string | null
          id: string
          name: string
        }
        Insert: {
          definition?: string | null
          examples?: Json
          how_to_counter?: string | null
          id: string
          name: string
        }
        Update: {
          definition?: string | null
          examples?: Json
          how_to_counter?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      fallacy_events: {
        Row: {
          fallacy_id: string | null
          id: string
          quote: string | null
          session_id: string
          timestamp: string
        }
        Insert: {
          fallacy_id?: string | null
          id?: string
          quote?: string | null
          session_id: string
          timestamp?: string
        }
        Update: {
          fallacy_id?: string | null
          id?: string
          quote?: string | null
          session_id?: string
          timestamp?: string
        }
        Relationships: [
          {
            foreignKeyName: "fallacy_events_fallacy_id_fkey"
            columns: ["fallacy_id"]
            isOneToOne: false
            referencedRelation: "fallacies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fallacy_events_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      fermi_questions: {
        Row: {
          answer: number | null
          difficulty: number | null
          explanation: string | null
          id: string
          question: string
        }
        Insert: {
          answer?: number | null
          difficulty?: number | null
          explanation?: string | null
          id?: string
          question: string
        }
        Update: {
          answer?: number | null
          difficulty?: number | null
          explanation?: string | null
          id?: string
          question?: string
        }
        Relationships: []
      }
      framework_progress: {
        Row: {
          framework_id: string
          id: string
          last_practised_at: string | null
          mastery: number
          times_practised: number
          user_id: string
        }
        Insert: {
          framework_id: string
          id?: string
          last_practised_at?: string | null
          mastery?: number
          times_practised?: number
          user_id: string
        }
        Update: {
          framework_id?: string
          id?: string
          last_practised_at?: string | null
          mastery?: number
          times_practised?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "framework_progress_framework_id_fkey"
            columns: ["framework_id"]
            isOneToOne: false
            referencedRelation: "frameworks"
            referencedColumns: ["id"]
          },
        ]
      }
      frameworks: {
        Row: {
          analogy: string | null
          definition: string | null
          example: string | null
          id: string
          name: string
          practice_prompt: string | null
          steps: Json
          when_to_use: string | null
        }
        Insert: {
          analogy?: string | null
          definition?: string | null
          example?: string | null
          id: string
          name: string
          practice_prompt?: string | null
          steps?: Json
          when_to_use?: string | null
        }
        Update: {
          analogy?: string | null
          definition?: string | null
          example?: string | null
          id?: string
          name?: string
          practice_prompt?: string | null
          steps?: Json
          when_to_use?: string | null
        }
        Relationships: []
      }
      headline_pairs: {
        Row: {
          correct: string | null
          difficulty: number | null
          explanation: string | null
          headline_a: string
          headline_b: string
          id: string
        }
        Insert: {
          correct?: string | null
          difficulty?: number | null
          explanation?: string | null
          headline_a: string
          headline_b: string
          id?: string
        }
        Update: {
          correct?: string | null
          difficulty?: number | null
          explanation?: string | null
          headline_a?: string
          headline_b?: string
          id?: string
        }
        Relationships: []
      }
      mysteries: {
        Row: {
          clues: Json
          difficulty: number | null
          id: string
          scenario: string | null
          solution: string | null
          title: string
        }
        Insert: {
          clues?: Json
          difficulty?: number | null
          id?: string
          scenario?: string | null
          solution?: string | null
          title: string
        }
        Update: {
          clues?: Json
          difficulty?: number | null
          id?: string
          scenario?: string | null
          solution?: string | null
          title?: string
        }
        Relationships: []
      }
      scores: {
        Row: {
          adaptability: number | null
          clarity: number | null
          counterarguments: number | null
          evidence: number | null
          id: string
          logic: number | null
          overall: number | null
          session_id: string
        }
        Insert: {
          adaptability?: number | null
          clarity?: number | null
          counterarguments?: number | null
          evidence?: number | null
          id?: string
          logic?: number | null
          overall?: number | null
          session_id: string
        }
        Update: {
          adaptability?: number | null
          clarity?: number | null
          counterarguments?: number | null
          evidence?: number | null
          id?: string
          logic?: number | null
          overall?: number | null
          session_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "scores_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      sessions: {
        Row: {
          difficulty: number | null
          ended_at: string | null
          id: string
          mode: Database["public"]["Enums"]["session_mode"]
          started_at: string
          sub_type: string | null
          topic_id: string | null
          transcript: Json
          user_id: string
        }
        Insert: {
          difficulty?: number | null
          ended_at?: string | null
          id?: string
          mode: Database["public"]["Enums"]["session_mode"]
          started_at?: string
          sub_type?: string | null
          topic_id?: string | null
          transcript?: Json
          user_id: string
        }
        Update: {
          difficulty?: number | null
          ended_at?: string | null
          id?: string
          mode?: Database["public"]["Enums"]["session_mode"]
          started_at?: string
          sub_type?: string | null
          topic_id?: string | null
          transcript?: Json
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "sessions_topic_id_fkey"
            columns: ["topic_id"]
            isOneToOne: false
            referencedRelation: "topics"
            referencedColumns: ["id"]
          },
        ]
      }
      topics: {
        Row: {
          category: string | null
          difficulty: number | null
          id: string
          title: string
        }
        Insert: {
          category?: string | null
          difficulty?: number | null
          id?: string
          title: string
        }
        Update: {
          category?: string | null
          difficulty?: number | null
          id?: string
          title?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string
          id: string
          name: string | null
        }
        Insert: {
          created_at?: string
          id: string
          name?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string | null
        }
        Relationships: []
      }
      weak_spots: {
        Row: {
          id: string
          ref_id: string
          severity: number
          type: Database["public"]["Enums"]["weak_spot_type"]
          updated_at: string
          user_id: string
        }
        Insert: {
          id?: string
          ref_id: string
          severity?: number
          type: Database["public"]["Enums"]["weak_spot_type"]
          updated_at?: string
          user_id: string
        }
        Update: {
          id?: string
          ref_id?: string
          severity?: number
          type?: Database["public"]["Enums"]["weak_spot_type"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      session_mode: "debate" | "game" | "lesson"
      weak_spot_type: "fallacy" | "rubric" | "framework"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      session_mode: ["debate", "game", "lesson"],
      weak_spot_type: ["fallacy", "rubric", "framework"],
    },
  },
} as const
