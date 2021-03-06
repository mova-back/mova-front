type Background =
  | 'background1'
  | 'background2'
  | 'background3'
  | 'background4'
  | 'background5'
  | 'background6';

export interface IProps {
  settingsElementMode?: boolean;
  background?: Background;
  actionBarHeader?: string;
}

interface BackgroundProperty {
  height: string;
  background: string;
}

export type BackgroundMap = { [key in Background]: BackgroundProperty };
