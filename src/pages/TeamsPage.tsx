
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useTeams, useTeamMembers } from '@/hooks/useTeams';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Helmet } from 'react-helmet-async';
import { Plus, Users, Settings, Trash2 } from 'lucide-react';
import Navbar from '@/components/Navbar';

const TeamsPage = () => {
  const { user } = useAuth();
  const { teams, loading, createTeam, deleteTeam } = useTeams();
  const { toast } = useToast();
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
  const [newTeamName, setNewTeamName] = useState('');
  const [newTeamDescription, setNewTeamDescription] = useState('');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const handleCreateTeam = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeamName.trim()) return;

    const { error } = await createTeam(newTeamName, newTeamDescription);
    
    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Team created successfully!",
      });
      setNewTeamName('');
      setNewTeamDescription('');
      setIsCreateDialogOpen(false);
    }
  };

  const handleDeleteTeam = async (teamId: string) => {
    const { error } = await deleteTeam(teamId);
    
    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Team deleted successfully!",
      });
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-atomic-cream flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <p className="text-atomic-navy">Please sign in to access teams.</p>
            <Button className="mt-4 atomic-button" onClick={() => window.location.href = '/auth'}>
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-atomic-cream">
      <Helmet>
        <title>Teams - Roll On Painting</title>
        <meta name="description" content="Manage your teams and members" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      
      <Navbar />
      
      <div className="pt-24 container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-atomic-navy">Teams</h1>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="atomic-button flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Create Team
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Team</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreateTeam} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="team-name">Team Name</Label>
                  <Input
                    id="team-name"
                    value={newTeamName}
                    onChange={(e) => setNewTeamName(e.target.value)}
                    placeholder="Enter team name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="team-description">Description (Optional)</Label>
                  <Input
                    id="team-description"
                    value={newTeamDescription}
                    onChange={(e) => setNewTeamDescription(e.target.value)}
                    placeholder="Enter team description"
                  />
                </div>
                <Button type="submit" className="w-full atomic-button">
                  Create Team
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <p className="text-atomic-navy">Loading teams...</p>
          </div>
        ) : teams.length === 0 ? (
          <Card className="text-center py-8">
            <CardContent>
              <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <p className="text-atomic-navy mb-4">No teams yet</p>
              <p className="text-gray-600 mb-6">Create your first team to get started.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teams.map((team) => (
              <TeamCard
                key={team.id}
                team={team}
                currentUserId={user.id}
                onDelete={handleDeleteTeam}
                onSelect={setSelectedTeam}
              />
            ))}
          </div>
        )}

        {selectedTeam && (
          <TeamMembersDialog
            teamId={selectedTeam}
            onClose={() => setSelectedTeam(null)}
          />
        )}
      </div>
    </div>
  );
};

const TeamCard = ({ team, currentUserId, onDelete, onSelect }: any) => {
  const isOwner = team.owner_id === currentUserId;
  
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl text-atomic-navy">{team.name}</CardTitle>
            {team.description && (
              <p className="text-gray-600 mt-2">{team.description}</p>
            )}
          </div>
          {isOwner && (
            <Badge variant="outline">Owner</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={() => onSelect(team.id)}
            className="flex items-center gap-2"
          >
            <Users className="h-4 w-4" />
            Members
          </Button>
          {isOwner && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(team.id)}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const TeamMembersDialog = ({ teamId, onClose }: any) => {
  const { members, loading, addMember } = useTeamMembers(teamId);
  const [newMemberEmail, setNewMemberEmail] = useState('');
  const { toast } = useToast();

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberEmail.trim()) return;

    const { error } = await addMember(newMemberEmail);
    
    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Member added successfully!",
      });
      setNewMemberEmail('');
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Team Members</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <form onSubmit={handleAddMember} className="flex gap-2">
            <Input
              type="email"
              placeholder="Enter member email"
              value={newMemberEmail}
              onChange={(e) => setNewMemberEmail(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" className="atomic-button">
              Add Member
            </Button>
          </form>

          <div className="space-y-2">
            {loading ? (
              <p>Loading members...</p>
            ) : (
              members.map((member) => (
                <div key={member.id} className="flex justify-between items-center p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{member.profiles?.full_name || member.profiles?.email}</p>
                    <p className="text-sm text-gray-600">{member.profiles?.email}</p>
                  </div>
                  <Badge variant={member.role === 'owner' ? 'default' : 'outline'}>
                    {member.role}
                  </Badge>
                </div>
              ))
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TeamsPage;
