import Owner from './Owner';

export default interface Repository {
  id: number;
  name: string;
  owner: Owner;
  description: string;
  stargazers_count: number;
  html_url: string;
}
