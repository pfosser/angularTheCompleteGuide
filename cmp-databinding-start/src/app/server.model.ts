export interface Server {
  type: 'server' | 'blueprint';
  name: string;
  content: string;
}

export interface ServerData {
  serverName: string;
  serverContent: string;
}
