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
          question: string
          answer: string
          lesson_id: string
        }
        Insert: {
          id?: string
          question: string
          answer: string
          lesson_id: string
        }
        Update: {
          id?: string
          question?: string
          answer?: string
          lesson_id?: string
        }
      }
      lesson: {
        Row: {
          id: string
          created_at: string
          name: string
        }
        Insert: {
          id?: string
          created_at?: string
          name?: string
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
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
          name: string
        }
        Insert: {
          id: string
          name: string
        }
        Update: {
          id?: string
          name?: string
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
