export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      card: {
        Row: {
          id: string
          question: string | null
          answer: string | null
          lesson_id: string | null
        }
        Insert: {
          id?: string
          question?: string | null
          answer?: string | null
          lesson_id?: string | null
        }
        Update: {
          id?: string
          question?: string | null
          answer?: string | null
          lesson_id?: string | null
        }
      }
      lesson: {
        Row: {
          id: string
          created_at: string | null
          name: string | null
        }
        Insert: {
          id?: string
          created_at?: string | null
          name?: string | null
        }
        Update: {
          id?: string
          created_at?: string | null
          name?: string | null
        }
      }
      users_mark_cards: {
        Row: {
          uid: string
          card_id: string
        }
        Insert: {
          uid: string
          card_id: string
        }
        Update: {
          uid?: string
          card_id?: string
        }
      }
      users_metadata: {
        Row: {
          id: string
          name: string | null
        }
        Insert: {
          id: string
          name?: string | null
        }
        Update: {
          id?: string
          name?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_name: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      marked_cards: {
        Args: { _uid: string; _lesson_id: string }
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
  }
}
