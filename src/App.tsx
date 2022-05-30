import './App.css';
import React from 'react';
import Titles from './components/Titles';
import Main from './components/Main';

export type SubTitle = {
  Subtitle: string;
  Time: string;
  Translation: string;
}

export type CaptionData = {
  title:string;
  subtitles:SubTitle[]
}

function App() {
  const titles = ['intern', 'friends1-3', 'juvenile'];

  const [captionData, setCaptionData] = React.useState<CaptionData>();
  const onTitleSelect = React.useCallback((captionData:CaptionData) => {
    setCaptionData(captionData);
  },[]);
  const onBack = React.useCallback(() => {
    setCaptionData(undefined);
  },[]);

  return (
    <div className="App">
      {!captionData && <Titles titles={titles} onSelect={onTitleSelect} />}
      {captionData && <Main captionData={captionData} onBack={onBack}/>}
    </div>
  );
}

export default App;
