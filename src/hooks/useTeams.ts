
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface Team {
  id: string;
  name: string;
  description: string | null;
  owner_id: string;
  created_at: string;
  updated_at: string;
}

export interface TeamMember {
  id: string;
  team_id: string;
  user_id: string;
  role: 'owner' | 'admin' | 'member';
  joined_at: string;
  profiles?: {
    full_name: string | null;
    email: string | null;
  };
}

export const useTeams = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchTeams = async () => {
    if (!user) return;

    setLoading(true);
    const { data, error } = await supabase
      .from('teams')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching teams:', error);
    } else {
      setTeams(data || []);
    }
    setLoading(false);
  };

  const createTeam = async (name: string, description?: string) => {
    if (!user) return { error: 'User not authenticated' };

    const { data, error } = await supabase
      .from('teams')
      .insert([
        {
          name,
          description,
          owner_id: user.id,
        },
      ])
      .select()
      .single();

    if (error) {
      return { error: error.message };
    }

    // Add the owner as a team member
    await supabase
      .from('team_members')
      .insert([
        {
          team_id: data.id,
          user_id: user.id,
          role: 'owner',
        },
      ]);

    await fetchTeams();
    return { data };
  };

  const updateTeam = async (id: string, updates: Partial<Team>) => {
    const { error } = await supabase
      .from('teams')
      .update(updates)
      .eq('id', id);

    if (error) {
      return { error: error.message };
    }

    await fetchTeams();
    return { error: null };
  };

  const deleteTeam = async (id: string) => {
    const { error } = await supabase
      .from('teams')
      .delete()
      .eq('id', id);

    if (error) {
      return { error: error.message };
    }

    await fetchTeams();
    return { error: null };
  };

  useEffect(() => {
    fetchTeams();
  }, [user]);

  return {
    teams,
    loading,
    createTeam,
    updateTeam,
    deleteTeam,
    refetch: fetchTeams,
  };
};

export const useTeamMembers = (teamId: string) => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMembers = async () => {
    if (!teamId) return;

    setLoading(true);
    const { data, error } = await supabase
      .from('team_members')
      .select(`
        *,
        profiles (
          full_name,
          email
        )
      `)
      .eq('team_id', teamId)
      .order('joined_at', { ascending: true });

    if (error) {
      console.error('Error fetching team members:', error);
    } else {
      // Type assertion to ensure role is properly typed
      const typedMembers = (data || []).map(member => ({
        ...member,
        role: member.role as 'owner' | 'admin' | 'member'
      }));
      setMembers(typedMembers);
    }
    setLoading(false);
  };

  const addMember = async (email: string, role: 'admin' | 'member' = 'member') => {
    // First, find the user by email
    const { data: profiles, error: profileError } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', email)
      .single();

    if (profileError || !profiles) {
      return { error: 'User not found' };
    }

    const { error } = await supabase
      .from('team_members')
      .insert([
        {
          team_id: teamId,
          user_id: profiles.id,
          role,
        },
      ]);

    if (error) {
      return { error: error.message };
    }

    await fetchMembers();
    return { error: null };
  };

  const updateMemberRole = async (memberId: string, role: 'admin' | 'member') => {
    const { error } = await supabase
      .from('team_members')
      .update({ role })
      .eq('id', memberId);

    if (error) {
      return { error: error.message };
    }

    await fetchMembers();
    return { error: null };
  };

  const removeMember = async (memberId: string) => {
    const { error } = await supabase
      .from('team_members')
      .delete()
      .eq('id', memberId);

    if (error) {
      return { error: error.message };
    }

    await fetchMembers();
    return { error: null };
  };

  useEffect(() => {
    fetchMembers();
  }, [teamId]);

  return {
    members,
    loading,
    addMember,
    updateMemberRole,
    removeMember,
    refetch: fetchMembers,
  };
};
