export class PaoGame {
  competition: string;
  time: string;
  arena: string;
  home_team_image_url: string;
  away_team_image_url: string;
  home_team: string;
  away_team: string;
  result: string;

  constructor(
    competition: string,
    time: string,
    arena: string,
    home_team_image_url: string,
    away_team_image_url: string,
    home_team: string,
    away_team: string,
    result: string
  ) {
    this.competition = competition;
    this.time = time;
    this.arena = arena;
    this.home_team_image_url = home_team_image_url;
    this.away_team_image_url = away_team_image_url;
    this.home_team = home_team;
    this.away_team = away_team;
    this.result = result;
  }
}
