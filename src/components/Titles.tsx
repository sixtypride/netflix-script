import React from 'react';
import { CaptionData } from '../App';

type Props = {
  titles:string[]
  onSelect:(captionData:CaptionData) => void;
}
export default function Titles(props:Props) {
  const { titles, onSelect } = props;

  const onTitleClick = React.useCallback((title) => {
    const json = require(`./../captions/${title}.json`);
    onSelect({ title, subtitles:json.Subtitles });
  }, []);

  return <div className="title-wrapper">
    {titles.map(title => {
      return <button key={title} className="title-btn" onClick={() => onTitleClick(title)}>{title}</button>
    })}
  </div>
}