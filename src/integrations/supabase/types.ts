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
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      cedar_shake_pricing: {
        Row: {
          created_at: string
          id: string
          labour_per_bundle_per_coat: number
          notes: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          labour_per_bundle_per_coat?: number
          notes?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          labour_per_bundle_per_coat?: number
          notes?: string | null
        }
        Relationships: []
      }
      cedar_shake_pricing_history: {
        Row: {
          changed_by: string | null
          created_at: string
          id: string
          labour_per_bundle_per_coat: number
          notes: string | null
        }
        Insert: {
          changed_by?: string | null
          created_at?: string
          id?: string
          labour_per_bundle_per_coat: number
          notes?: string | null
        }
        Update: {
          changed_by?: string | null
          created_at?: string
          id?: string
          labour_per_bundle_per_coat?: number
          notes?: string | null
        }
        Relationships: []
      }
      clients: {
        Row: {
          address: string | null
          auth_user_id: string | null
          city: string | null
          company_name: string | null
          contact_name: string | null
          created_at: string
          email: string | null
          id: string
          is_active: boolean
          notes: string | null
          phone: string | null
          postal_code: string | null
          province: string | null
        }
        Insert: {
          address?: string | null
          auth_user_id?: string | null
          city?: string | null
          company_name?: string | null
          contact_name?: string | null
          created_at?: string
          email?: string | null
          id?: string
          is_active?: boolean
          notes?: string | null
          phone?: string | null
          postal_code?: string | null
          province?: string | null
        }
        Update: {
          address?: string | null
          auth_user_id?: string | null
          city?: string | null
          company_name?: string | null
          contact_name?: string | null
          created_at?: string
          email?: string | null
          id?: string
          is_active?: boolean
          notes?: string | null
          phone?: string | null
          postal_code?: string | null
          province?: string | null
        }
        Relationships: []
      }
      coating_products: {
        Row: {
          cost_per_gallon: number
          coverage_mdf_preprimed_sqft_per_gallon: number
          coverage_mdf_raw_first_coat_sqft_per_gallon: number
          coverage_mdf_raw_subsequent_sqft_per_gallon: number
          coverage_rough_sqft_per_gallon: number
          coverage_smooth_sqft_per_gallon: number
          created_at: string
          id: string
          is_active: boolean
          manufacturer: string | null
          name: string
          notes: string | null
          sale_price_per_gallon: number | null
        }
        Insert: {
          cost_per_gallon: number
          coverage_mdf_preprimed_sqft_per_gallon?: number
          coverage_mdf_raw_first_coat_sqft_per_gallon?: number
          coverage_mdf_raw_subsequent_sqft_per_gallon?: number
          coverage_rough_sqft_per_gallon?: number
          coverage_smooth_sqft_per_gallon?: number
          created_at?: string
          id?: string
          is_active?: boolean
          manufacturer?: string | null
          name: string
          notes?: string | null
          sale_price_per_gallon?: number | null
        }
        Update: {
          cost_per_gallon?: number
          coverage_mdf_preprimed_sqft_per_gallon?: number
          coverage_mdf_raw_first_coat_sqft_per_gallon?: number
          coverage_mdf_raw_subsequent_sqft_per_gallon?: number
          coverage_rough_sqft_per_gallon?: number
          coverage_smooth_sqft_per_gallon?: number
          created_at?: string
          id?: string
          is_active?: boolean
          manufacturer?: string | null
          name?: string
          notes?: string | null
          sale_price_per_gallon?: number | null
        }
        Relationships: []
      }
      edge_function_rate_limits: {
        Row: {
          attempted_at: string
          function_name: string
          id: string
          ip_address: string
        }
        Insert: {
          attempted_at?: string
          function_name: string
          id?: string
          ip_address: string
        }
        Update: {
          attempted_at?: string
          function_name?: string
          id?: string
          ip_address?: string
        }
        Relationships: []
      }
      labour_rate_history: {
        Row: {
          changed_by: string | null
          created_at: string
          effective_date: string
          id: string
          notes: string | null
          profile_id: string | null
          rate_per_lineal_ft_per_pass: number
        }
        Insert: {
          changed_by?: string | null
          created_at?: string
          effective_date?: string
          id?: string
          notes?: string | null
          profile_id?: string | null
          rate_per_lineal_ft_per_pass: number
        }
        Update: {
          changed_by?: string | null
          created_at?: string
          effective_date?: string
          id?: string
          notes?: string | null
          profile_id?: string | null
          rate_per_lineal_ft_per_pass?: number
        }
        Relationships: [
          {
            foreignKeyName: "labour_rate_history_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles_lumber"
            referencedColumns: ["id"]
          },
        ]
      }
      labour_rates: {
        Row: {
          created_at: string
          effective_date: string
          id: string
          is_active: boolean
          notes: string | null
          profile_id: string | null
          rate_per_lineal_ft_per_pass: number
        }
        Insert: {
          created_at?: string
          effective_date?: string
          id?: string
          is_active?: boolean
          notes?: string | null
          profile_id?: string | null
          rate_per_lineal_ft_per_pass: number
        }
        Update: {
          created_at?: string
          effective_date?: string
          id?: string
          is_active?: boolean
          notes?: string | null
          profile_id?: string | null
          rate_per_lineal_ft_per_pass?: number
        }
        Relationships: [
          {
            foreignKeyName: "labour_rates_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles_lumber"
            referencedColumns: ["id"]
          },
        ]
      }
      order_status_history: {
        Row: {
          changed_by: string | null
          created_at: string
          id: string
          notes: string | null
          order_id: string
          status: Database["public"]["Enums"]["order_status"]
        }
        Insert: {
          changed_by?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          order_id: string
          status: Database["public"]["Enums"]["order_status"]
        }
        Update: {
          changed_by?: string | null
          created_at?: string
          id?: string
          notes?: string | null
          order_id?: string
          status?: Database["public"]["Enums"]["order_status"]
        }
        Relationships: [
          {
            foreignKeyName: "order_status_history_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          actual_end_date: string | null
          actual_start_date: string | null
          anticipated_end_date: string | null
          anticipated_start_date: string | null
          architect_designer: string | null
          assigned_staff: string | null
          bundle_lot_numbers: string | null
          client_id: string
          coating_brand_specified: string | null
          created_at: string
          delivery_method: Database["public"]["Enums"]["delivery_method"] | null
          end_builder_company: string | null
          end_builder_email: string | null
          end_builder_name: string | null
          end_builder_phone: string | null
          end_sealing_required: boolean | null
          id: string
          internal_notes: string | null
          invoice_number: string | null
          job_number: string | null
          job_site_address: string | null
          job_site_city: string | null
          job_site_postal: string | null
          job_site_province: string | null
          moisture_content: string | null
          order_number: string
          payment_status: Database["public"]["Enums"]["payment_status"]
          photo_documentation_requested: boolean | null
          primer_required: boolean | null
          purchase_order_number: string | null
          quote_id: string | null
          return_delivery_required: boolean | null
          rush_order: boolean
          special_instructions: string | null
          status: Database["public"]["Enums"]["order_status"]
          warranty_registered: boolean
          wood_grade: string | null
          wood_supplied_by: Database["public"]["Enums"]["wood_supplier"] | null
        }
        Insert: {
          actual_end_date?: string | null
          actual_start_date?: string | null
          anticipated_end_date?: string | null
          anticipated_start_date?: string | null
          architect_designer?: string | null
          assigned_staff?: string | null
          bundle_lot_numbers?: string | null
          client_id: string
          coating_brand_specified?: string | null
          created_at?: string
          delivery_method?:
            | Database["public"]["Enums"]["delivery_method"]
            | null
          end_builder_company?: string | null
          end_builder_email?: string | null
          end_builder_name?: string | null
          end_builder_phone?: string | null
          end_sealing_required?: boolean | null
          id?: string
          internal_notes?: string | null
          invoice_number?: string | null
          job_number?: string | null
          job_site_address?: string | null
          job_site_city?: string | null
          job_site_postal?: string | null
          job_site_province?: string | null
          moisture_content?: string | null
          order_number?: string
          payment_status?: Database["public"]["Enums"]["payment_status"]
          photo_documentation_requested?: boolean | null
          primer_required?: boolean | null
          purchase_order_number?: string | null
          quote_id?: string | null
          return_delivery_required?: boolean | null
          rush_order?: boolean
          special_instructions?: string | null
          status?: Database["public"]["Enums"]["order_status"]
          warranty_registered?: boolean
          wood_grade?: string | null
          wood_supplied_by?: Database["public"]["Enums"]["wood_supplier"] | null
        }
        Update: {
          actual_end_date?: string | null
          actual_start_date?: string | null
          anticipated_end_date?: string | null
          anticipated_start_date?: string | null
          architect_designer?: string | null
          assigned_staff?: string | null
          bundle_lot_numbers?: string | null
          client_id?: string
          coating_brand_specified?: string | null
          created_at?: string
          delivery_method?:
            | Database["public"]["Enums"]["delivery_method"]
            | null
          end_builder_company?: string | null
          end_builder_email?: string | null
          end_builder_name?: string | null
          end_builder_phone?: string | null
          end_sealing_required?: boolean | null
          id?: string
          internal_notes?: string | null
          invoice_number?: string | null
          job_number?: string | null
          job_site_address?: string | null
          job_site_city?: string | null
          job_site_postal?: string | null
          job_site_province?: string | null
          moisture_content?: string | null
          order_number?: string
          payment_status?: Database["public"]["Enums"]["payment_status"]
          photo_documentation_requested?: boolean | null
          primer_required?: boolean | null
          purchase_order_number?: string | null
          quote_id?: string | null
          return_delivery_required?: boolean | null
          rush_order?: boolean
          special_instructions?: string | null
          status?: Database["public"]["Enums"]["order_status"]
          warranty_registered?: boolean
          wood_grade?: string | null
          wood_supplied_by?: Database["public"]["Enums"]["wood_supplier"] | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "quotes"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles_lumber: {
        Row: {
          actual_thickness_inches: number
          actual_width_inches: number
          back_face_sqft_per_lineal_ft: number
          created_at: string
          edge_sqft_per_lineal_ft: number
          front_face_sqft_per_lineal_ft: number
          id: string
          is_active: boolean
          material_type: Database["public"]["Enums"]["material_type"]
          name: string
          nominal_thickness_inches: number
          nominal_width_inches: number
          notes: string | null
          profile_type: Database["public"]["Enums"]["profile_type"]
          surface_type: Database["public"]["Enums"]["surface_type"]
          total_sqft_per_lineal_ft: number
        }
        Insert: {
          actual_thickness_inches: number
          actual_width_inches: number
          back_face_sqft_per_lineal_ft: number
          created_at?: string
          edge_sqft_per_lineal_ft: number
          front_face_sqft_per_lineal_ft: number
          id?: string
          is_active?: boolean
          material_type: Database["public"]["Enums"]["material_type"]
          name: string
          nominal_thickness_inches: number
          nominal_width_inches: number
          notes?: string | null
          profile_type: Database["public"]["Enums"]["profile_type"]
          surface_type: Database["public"]["Enums"]["surface_type"]
          total_sqft_per_lineal_ft: number
        }
        Update: {
          actual_thickness_inches?: number
          actual_width_inches?: number
          back_face_sqft_per_lineal_ft?: number
          created_at?: string
          edge_sqft_per_lineal_ft?: number
          front_face_sqft_per_lineal_ft?: number
          id?: string
          is_active?: boolean
          material_type?: Database["public"]["Enums"]["material_type"]
          name?: string
          nominal_thickness_inches?: number
          nominal_width_inches?: number
          notes?: string | null
          profile_type?: Database["public"]["Enums"]["profile_type"]
          surface_type?: Database["public"]["Enums"]["surface_type"]
          total_sqft_per_lineal_ft?: number
        }
        Relationships: []
      }
      quote_lumber_items: {
        Row: {
          back_sqft_per_coat: number | null
          coating_product_id: string | null
          coats_back: number
          coats_front: number
          edge_sqft_per_pass: number | null
          front_sqft_per_pass: number | null
          gallons_required: number | null
          id: string
          labour_cost: number | null
          lineal_feet: number
          material_cost: number | null
          notes: string | null
          profile_id: string | null
          quote_id: string
          species_id: string | null
          total_cost: number | null
          total_material_sqft: number | null
          total_passes: number
        }
        Insert: {
          back_sqft_per_coat?: number | null
          coating_product_id?: string | null
          coats_back?: number
          coats_front: number
          edge_sqft_per_pass?: number | null
          front_sqft_per_pass?: number | null
          gallons_required?: number | null
          id?: string
          labour_cost?: number | null
          lineal_feet: number
          material_cost?: number | null
          notes?: string | null
          profile_id?: string | null
          quote_id: string
          species_id?: string | null
          total_cost?: number | null
          total_material_sqft?: number | null
          total_passes: number
        }
        Update: {
          back_sqft_per_coat?: number | null
          coating_product_id?: string | null
          coats_back?: number
          coats_front?: number
          edge_sqft_per_pass?: number | null
          front_sqft_per_pass?: number | null
          gallons_required?: number | null
          id?: string
          labour_cost?: number | null
          lineal_feet?: number
          material_cost?: number | null
          notes?: string | null
          profile_id?: string | null
          quote_id?: string
          species_id?: string | null
          total_cost?: number | null
          total_material_sqft?: number | null
          total_passes?: number
        }
        Relationships: [
          {
            foreignKeyName: "quote_lumber_items_coating_product_id_fkey"
            columns: ["coating_product_id"]
            isOneToOne: false
            referencedRelation: "coating_products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quote_lumber_items_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles_lumber"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quote_lumber_items_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "quotes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quote_lumber_items_species_id_fkey"
            columns: ["species_id"]
            isOneToOne: false
            referencedRelation: "species"
            referencedColumns: ["id"]
          },
        ]
      }
      quote_requests: {
        Row: {
          cottage_location: string | null
          created_at: string
          email: string
          has_attachments: boolean | null
          id: string
          internal_notes: string | null
          lead_tags: string[] | null
          message: string | null
          name: string
          owns_cottage: string | null
          phone: string
          property_type: string | null
          property_value_range: string | null
          service: string
        }
        Insert: {
          cottage_location?: string | null
          created_at?: string
          email: string
          has_attachments?: boolean | null
          id?: string
          internal_notes?: string | null
          lead_tags?: string[] | null
          message?: string | null
          name: string
          owns_cottage?: string | null
          phone: string
          property_type?: string | null
          property_value_range?: string | null
          service: string
        }
        Update: {
          cottage_location?: string | null
          created_at?: string
          email?: string
          has_attachments?: boolean | null
          id?: string
          internal_notes?: string | null
          lead_tags?: string[] | null
          message?: string | null
          name?: string
          owns_cottage?: string | null
          phone?: string
          property_type?: string | null
          property_value_range?: string | null
          service?: string
        }
        Relationships: []
      }
      quote_shake_items: {
        Row: {
          coating_product_id: string | null
          coats: number
          id: string
          labour_cost_per_bundle_per_coat: number
          material_cost_per_bundle_per_coat: number | null
          notes: string | null
          number_of_bundles: number
          quote_id: string
          total_cost: number | null
          total_labour_cost: number | null
          total_material_cost: number | null
        }
        Insert: {
          coating_product_id?: string | null
          coats: number
          id?: string
          labour_cost_per_bundle_per_coat?: number
          material_cost_per_bundle_per_coat?: number | null
          notes?: string | null
          number_of_bundles: number
          quote_id: string
          total_cost?: number | null
          total_labour_cost?: number | null
          total_material_cost?: number | null
        }
        Update: {
          coating_product_id?: string | null
          coats?: number
          id?: string
          labour_cost_per_bundle_per_coat?: number
          material_cost_per_bundle_per_coat?: number | null
          notes?: string | null
          number_of_bundles?: number
          quote_id?: string
          total_cost?: number | null
          total_labour_cost?: number | null
          total_material_cost?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "quote_shake_items_coating_product_id_fkey"
            columns: ["coating_product_id"]
            isOneToOne: false
            referencedRelation: "coating_products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quote_shake_items_quote_id_fkey"
            columns: ["quote_id"]
            isOneToOne: false
            referencedRelation: "quotes"
            referencedColumns: ["id"]
          },
        ]
      }
      quotes: {
        Row: {
          admin_notes: string | null
          approved_at: string | null
          client_id: string
          client_notes: string | null
          created_at: string
          id: string
          quote_number: string
          quote_type: Database["public"]["Enums"]["quote_type"]
          reviewed_at: string | null
          status: Database["public"]["Enums"]["quote_status"]
          submitted_at: string | null
          total_cost: number
          total_labour_cost: number
          total_material_cost: number
        }
        Insert: {
          admin_notes?: string | null
          approved_at?: string | null
          client_id: string
          client_notes?: string | null
          created_at?: string
          id?: string
          quote_number?: string
          quote_type: Database["public"]["Enums"]["quote_type"]
          reviewed_at?: string | null
          status?: Database["public"]["Enums"]["quote_status"]
          submitted_at?: string | null
          total_cost?: number
          total_labour_cost?: number
          total_material_cost?: number
        }
        Update: {
          admin_notes?: string | null
          approved_at?: string | null
          client_id?: string
          client_notes?: string | null
          created_at?: string
          id?: string
          quote_number?: string
          quote_type?: Database["public"]["Enums"]["quote_type"]
          reviewed_at?: string | null
          status?: Database["public"]["Enums"]["quote_status"]
          submitted_at?: string | null
          total_cost?: number
          total_labour_cost?: number
          total_material_cost?: number
        }
        Relationships: [
          {
            foreignKeyName: "quotes_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      species: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          name: string
          notes: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          name: string
          notes?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          name?: string
          notes?: string | null
        }
        Relationships: []
      }
      team_members: {
        Row: {
          id: string
          joined_at: string | null
          role: string
          team_id: string
          user_id: string
        }
        Insert: {
          id?: string
          joined_at?: string | null
          role?: string
          team_id: string
          user_id: string
        }
        Update: {
          id?: string
          joined_at?: string | null
          role?: string
          team_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "team_members_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "team_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      teams: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          name: string
          owner_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          owner_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          owner_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "teams_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      cleanup_rate_limits: { Args: never; Returns: undefined }
      generate_order_number: { Args: never; Returns: string }
      generate_quote_number: { Args: never; Returns: string }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin: { Args: { _user_id: string }; Returns: boolean }
      is_team_member: {
        Args: { _team_id: string; _user_id: string }
        Returns: boolean
      }
      is_team_owner: {
        Args: { _team_id: string; _user_id: string }
        Returns: boolean
      }
      is_team_owner_or_admin: {
        Args: { _team_id: string; _user_id: string }
        Returns: boolean
      }
      owns_client: {
        Args: { _client_id: string; _user_id: string }
        Returns: boolean
      }
      owns_quote: {
        Args: { _quote_id: string; _user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "client"
      delivery_method: "client_delivers" | "roll_on_picks_up" | "third_party"
      material_type: "wood" | "mdf"
      order_status:
        | "received"
        | "in_queue"
        | "in_progress"
        | "quality_check"
        | "complete"
        | "shipped"
      payment_status: "unpaid" | "invoiced" | "partial" | "paid"
      profile_type:
        | "tongue_groove"
        | "shiplap"
        | "bevel"
        | "board_batten"
        | "dimensional"
        | "other"
      quote_status:
        | "pending_review"
        | "approved"
        | "declined"
        | "converted_to_order"
      quote_type: "lumber" | "cedar_shake"
      surface_type: "smooth" | "rough" | "mdf_preprimed" | "mdf_raw"
      wood_supplier: "client" | "roll_on"
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
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
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
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
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
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
      app_role: ["admin", "client"],
      delivery_method: ["client_delivers", "roll_on_picks_up", "third_party"],
      material_type: ["wood", "mdf"],
      order_status: [
        "received",
        "in_queue",
        "in_progress",
        "quality_check",
        "complete",
        "shipped",
      ],
      payment_status: ["unpaid", "invoiced", "partial", "paid"],
      profile_type: [
        "tongue_groove",
        "shiplap",
        "bevel",
        "board_batten",
        "dimensional",
        "other",
      ],
      quote_status: [
        "pending_review",
        "approved",
        "declined",
        "converted_to_order",
      ],
      quote_type: ["lumber", "cedar_shake"],
      surface_type: ["smooth", "rough", "mdf_preprimed", "mdf_raw"],
      wood_supplier: ["client", "roll_on"],
    },
  },
} as const
