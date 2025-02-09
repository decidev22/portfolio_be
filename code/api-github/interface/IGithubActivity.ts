export interface IGithubActivity {
  id: string;
  type: string;
  actor: string; // actor.name
  repo_name: string; // repo.name match decidev/w*
  repo_url: string; // repo.url
  payload: Record<string, string>; //payload.commits[].message
  date: string; // created_at
}
