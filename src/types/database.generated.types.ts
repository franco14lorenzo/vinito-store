export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      accommodations: {
        Row: {
          address: string
          created_at: string
          created_by: number | null
          id: string
          latitude: number | null
          longitude: number | null
          name: string
          qr_code: string
          status: Database['public']['Enums']['accommodation_status']
          updated_at: string
          updated_by: number | null
        }
        Insert: {
          address: string
          created_at?: string
          created_by?: number | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          name: string
          qr_code: string
          status?: Database['public']['Enums']['accommodation_status']
          updated_at?: string
          updated_by?: number | null
        }
        Update: {
          address?: string
          created_at?: string
          created_by?: number | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          name?: string
          qr_code?: string
          status?: Database['public']['Enums']['accommodation_status']
          updated_at?: string
          updated_by?: number | null
        }
        Relationships: [
          {
            foreignKeyName: 'accommodations_created_by_fkey'
            columns: ['created_by']
            isOneToOne: false
            referencedRelation: 'admin'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'accommodations_updated_by_fkey'
            columns: ['updated_by']
            isOneToOne: false
            referencedRelation: 'admin'
            referencedColumns: ['id']
          }
        ]
      }
      admin: {
        Row: {
          created_at: string
          created_by: number | null
          email: string
          id: number
          name: string
          surname: string
          updated_at: string
          updated_by: number | null
        }
        Insert: {
          created_at?: string
          created_by?: number | null
          email: string
          id?: never
          name: string
          surname: string
          updated_at?: string
          updated_by?: number | null
        }
        Update: {
          created_at?: string
          created_by?: number | null
          email?: string
          id?: never
          name?: string
          surname?: string
          updated_at?: string
          updated_by?: number | null
        }
        Relationships: []
      }
      tasting_wines: {
        Row: {
          tasting_id: number
          wine_id: number
        }
        Insert: {
          tasting_id: number
          wine_id: number
        }
        Update: {
          tasting_id?: number
          wine_id?: number
        }
        Relationships: [
          {
            foreignKeyName: 'tasting_wines_tasting_id_fkey'
            columns: ['tasting_id']
            isOneToOne: false
            referencedRelation: 'tastings'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'tasting_wines_wine_id_fkey'
            columns: ['wine_id']
            isOneToOne: false
            referencedRelation: 'wines'
            referencedColumns: ['id']
          }
        ]
      }
      tastings: {
        Row: {
          created_at: string
          created_by: number | null
          id: number
          image: string | null
          long_description: string | null
          name: string
          pairings: string | null
          price: number
          short_description: string | null
          slug: string
          status: Database['public']['Enums']['tasting_status']
          stock: number
          updated_at: string
          updated_by: number | null
        }
        Insert: {
          created_at?: string
          created_by?: number | null
          id?: never
          image?: string | null
          long_description?: string | null
          name: string
          pairings?: string | null
          price: number
          short_description?: string | null
          slug: string
          status?: Database['public']['Enums']['tasting_status']
          stock?: number
          updated_at?: string
          updated_by?: number | null
        }
        Update: {
          created_at?: string
          created_by?: number | null
          id?: never
          image?: string | null
          long_description?: string | null
          name?: string
          pairings?: string | null
          price?: number
          short_description?: string | null
          slug?: string
          status?: Database['public']['Enums']['tasting_status']
          stock?: number
          updated_at?: string
          updated_by?: number | null
        }
        Relationships: [
          {
            foreignKeyName: 'tastings_created_by_fkey'
            columns: ['created_by']
            isOneToOne: false
            referencedRelation: 'admin'
            referencedColumns: ['id']
          }
        ]
      }
      wines: {
        Row: {
          cost_usd_blue: number
          created_at: string
          created_by: number | null
          description: string | null
          id: number
          image: string | null
          name: string
          price: number
          status: Database['public']['Enums']['wine_status']
          stock: number | null
          updated_at: string
          updated_by: number | null
          variety: string
          volume_ml: number
          winery: string
          year: number
        }
        Insert: {
          cost_usd_blue: number
          created_at?: string
          created_by?: number | null
          description?: string | null
          id?: never
          image?: string | null
          name: string
          price: number
          status?: Database['public']['Enums']['wine_status']
          stock?: number | null
          updated_at?: string
          updated_by?: number | null
          variety: string
          volume_ml: number
          winery: string
          year: number
        }
        Update: {
          cost_usd_blue?: number
          created_at?: string
          created_by?: number | null
          description?: string | null
          id?: never
          image?: string | null
          name?: string
          price?: number
          status?: Database['public']['Enums']['wine_status']
          stock?: number | null
          updated_at?: string
          updated_by?: number | null
          variety?: string
          volume_ml?: number
          winery?: string
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: 'wines_created_by_fkey'
            columns: ['created_by']
            isOneToOne: false
            referencedRelation: 'admin'
            referencedColumns: ['id']
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      accommodation_status: 'draft' | 'active' | 'inactive' | 'deleted'
      order_state:
        | 'pending'
        | 'processing'
        | 'shipped'
        | 'delivered'
        | 'cancelled'
      tasting_status: 'draft' | 'active' | 'inactive' | 'deleted'
      wine_status: 'draft' | 'active' | 'inactive' | 'deleted'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, 'public'>]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
      PublicSchema['Views'])
  ? (PublicSchema['Tables'] &
      PublicSchema['Views'])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
  ? PublicSchema['Enums'][PublicEnumNameOrOptions]
  : never
