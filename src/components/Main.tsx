import { Slider } from '@material-ui/core';
import React from 'react';
import { CaptionData, SubTitle } from '../App';

type Props = {
  captionData:CaptionData;
  onBack:() => void;
}
export default function Main(props:Props) {
  const { onBack, captionData } = props;
  const { title, subtitles } = captionData;
  const total = subtitles.length - 1;
  const initialIndex = localStorage.getItem(title) || "0";

  const [index, setIndex] = React.useState(parseInt(initialIndex));
  const [selectedWord, setSelectedWord] = React.useState('');
  const [showKor, setShowKor] = React.useState(false);
  const engRef = React.useRef<HTMLParagraphElement>(null);

  const subTitle = subtitles[index] as SubTitle;

  const prevDisabled = index === 0;
  const nextDisabled = index === total;

  const onSubTitleWholeClick = React.useCallback((e) => {
    const selection = window.getSelection();        
    const range = document.createRange();
    range.selectNodeContents(engRef.current as Node);
    selection?.removeAllRanges();
    selection?.addRange(range);
  }, []);

  const onEngClick = React.useCallback((e) => {
    const selection = window.getSelection();
    const range = selection?.getRangeAt(0);
    const node = selection?.anchorNode;
    if(!range || !node) return;

    while (range.toString().indexOf(' ') !== 0) {
      range.setStart(node, (range.startOffset - 1));
    }
    range.setStart(node, range.startOffset + 1);
    do {
      range.setEnd(node, range.endOffset + 1);
    }
    while (range.toString().indexOf(' ') === -1 && range.toString().trim() !== '');
    setSelectedWord(range.toString().trim());
  }, []);

  const onPrev = React.useCallback(() => {
    if(prevDisabled) return;
    setIndex(index => index - 1);
  }, [prevDisabled]);

  const onNext = React.useCallback(() => {
    if(nextDisabled) return;
    setIndex(index => index + 1);
  }, [nextDisabled]);

  const onKorClick = React.useCallback(() => {
    setShowKor( show => !show);
  }, []);

  const onSliderChange = React.useCallback((e, newValue) => {
    setIndex(newValue);
  }, []);

  const onBackClick = React.useCallback(() => {
    onBack();
  }, []);

  const dicSrc = selectedWord ? `https://en.dict.naver.com/#/search?range=word&query=${selectedWord}` : "https://en.dict.naver.com/";

  if(localStorage) {
    localStorage.setItem(title, index.toString());
  }

  return <div className="wrapper">
    <div className="header">
      <button className="back" onClick={onBackClick}>BACK</button>
      <h1 className="title">{title}</h1>
      <button className="back" onClick={onBackClick}>BACK</button>
    </div>
    <div className="eng">
      <p onClick={onEngClick}ref={engRef}>{" " + subTitle.Subtitle + " "}</p>
      <button className="whole-select-1" onClick={onSubTitleWholeClick}></button>
      <button className="whole-select-2" onClick={onSubTitleWholeClick}></button>
    </div>
    <div className="kor" onClick={onKorClick}>
      <p className={showKor ? "enabled" : "disabled"}>{subTitle.Translation}</p>
    </div>
    <div className="buttonContainer">
      <button className="btn" onClick={onPrev}>PREV</button>
      <span className="index">{index} / {total}</span>
      <button className="btn" onClick={onPrev}>PREV</button>
    </div>
    <div className="buttonContainer">
      <button className="btn" onClick={onNext}>NEXT</button>
      <div className="slider">
        <Slider
          value={index}
          min={0}
          max={total}
          onChange={onSliderChange}
          aria-labelledby="input-slider"
        />
      </div>
      <button className="btn" onClick={onNext}>NEXT</button>
    </div>
    <iframe className="iframe" title="dic" src={dicSrc} />
  </div>
}