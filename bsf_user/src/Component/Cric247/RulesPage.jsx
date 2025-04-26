import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import './css/Rules.css';
import { useEffect } from 'react';

// Styled container with improved spacing & shadow
const RulesContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#ffffff',
  color: '#2a4d8f',
  padding: '20px',
  borderRadius: '12px',
  boxShadow: '0px 6px 14px rgba(0, 0, 0, 0.1)',
  maxWidth: '80%',
  width: '100%',
  textAlign: 'start',
  fontFamily: '"Roboto", sans-serif',
  lineHeight: '1.6',
  [theme.breakpoints.down('sm')]: {
    minWidth: '90%',
    fontSize: '0.8em',
    padding: '16px',
  },
}));

// Note Container: Softer look, subtle shadow
const NoteContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#f1f5f9',
  color: '#222',
  fontWeight: '500',
  padding: '16px',
  borderRadius: '8px',
  boxShadow: '0px 3px 8px rgba(0, 0, 0, 0.08)',
  margin: '35px auto 10px',
  width: '95%',
  fontStyle: 'italic',
  textAlign: 'center',
  fontSize: '1.05em',
  [theme.breakpoints.down('sm')]: {
    minWidth: '90%',
    fontSize: '0.9em',
  },
}));

// Each Rule Row: Better spacing & separation
const RuleRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  padding: '14px 0',
  width: '100%',
  borderBottom: '1px solid #dcdcdc',
  '&:last-child': {
    borderBottom: 'none',
  },
}));

// Serial Number: More defined
const SerialNumber = styled('span')(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '1.2em',
  color: '#374151',
  minWidth: '30px',
}));

// Rule Text: Improved readability
const RuleText = styled('span')(({ theme }) => ({
  flexGrow: 1,
  fontSize: '1.05em',
  color: '#333',
}));

export default function RulesPage({ lang, onMainMenuClick }) {
  const rulesHindi = [
    'कृपया NICE 247 के नियमों को समझने के लिए यहां कुछ मिनट दें, और अपने अनुसार समझ लें |',
    'लॉग इन करने के बाद अपना पासवर्ड बदल लें |',
    'प्रत्येक गेम के लिए 0  /- कॉइन्स चार्ज रहेगा |',
    'यदि आप मैच या सेशन का एक भी सौदा नहीं करते हो, ऐसे में आपसे 0/- कॉइन्स का चार्ज लिया जायेगा |',
    'सभी एडवांस सौदे टॉस के बाद लिए जाएंगे |',
    'खेल रद्द या टाई होने पर सभी सौदे रद्द कर दिए जाएंगे और लेनदेन सेशन और फैंसी जो पूरा हो गया है उस पर किया जाएगा |',
    'मैच का सौदा कम से कम 2000.0 और अधिकतम 1000000.0 है और सेशन का सौदा कम से कम 1000.0 और अधिकतम 50000.0 है।',
    'लाइव ड्रा टीवी स्कोर पर निर्भर है | दर कभी नहीं बदली जाती है | यह यूजर के लिए अच्छा मौका है |',
    'मैच के दौरान भाव को देख और समझ कर ही सौदा करें | किये गए किसी भी सौदे को हटाया या बदला नहीं जायेगा | सभी सौदे के लिए आप स्वयं जिम्मेवार हैं |',
    'यहाँ सभी सौदे लेजर से मान्य किये जायेंगे |',
    'कैसीनो में परिणाम फंसने की स्थिति में लेनदेन रद्द कर दिया जाएगा।',
    'इनसाइड-आउट गेम में पहला कार्ड खोले जाने पर 25% का भुगतान किया जाएगा।',
    'गेम खेलने से पहले कैसीनो के नियम भी पढ़ें।',
    'कैसीनो में किसी भी प्रकार के तर्क स्वीकार नहीं किए जाएंगे।',
    'इंटरनेट कनेक्शन प्रॉब्लम की जिम्मेवारी आपकी रहेगी |',
  ];

  const noteHindi = "नोट: सर्वर या वेबसाइट में किसी तरह की खराबी आने या बंद हो जाने पर केवल किए गए सौदे ही मान्य होंगे |ऐसी स्तिथि में किसी तरह का वाद-विवाद मान्य नहीं होगा |";

  const rulesEnglish = [
    'Please give a few minutes to understand rules of NICE 247 here, as best as you can.',
    'Change your password after you log in.',
    'All the advance bets will be accepted after the toss.',
    'For every Match 0/- coins will be charged.',
    '0/- coins will be charged if user will not play any Market bet or Session bet in a match.',
    'If game is cancelled or tie then all the deals will be cancelled and the transactions will be done on session and fancy which are completed.',
    'The deal of the match is at least 2000.0 and maximum 1000000.0 and the deal of session is at least 1000.0 and maximun 50000.0.',
    'Live draw is settled on TV score, rate is never changed. This is good chance for users.',
    'During the match, please bet only after confirming the deal. Once the deal is confirmed, it cannot be changed or removed. Responsibility of every deal is yours.',
    'All transactions will be validated from ledger only.',
    'Transactions will be canceled in case the result is stuck in the casino.',
    'In an inside-out game 25% will be paid out when the first card is opened.',
    'Also read the casino rules before playing the game.',
    'Arguments of any kind will not be accepted in the casino.',
    'It\'ll be user\'s responsibility for internet connection problem.',
  ];

  const noteEnglish = "Note: In case of any technical issue or shutdown of the server or website, only the trades already executed will be valid. No disputes or claims will be entertained in such situations."

  const rules = lang === 'hi' ? rulesHindi : rulesEnglish;
  const note = lang === 'hi' ? noteHindi : noteEnglish;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <RulesContainer>
      {rules.map((rule, index) => (
        <RuleRow key={index}>
          <SerialNumber>{index + 1}.</SerialNumber>
          <RuleText>{rule}</RuleText>
        </RuleRow>
      ))}
      <NoteContainer>
        <label>{note}</label>
      </NoteContainer>
      <div style={{ textAlign: 'center' }}>
        <button className="rules-page-main-menu-button" role='button' onClick={(e) => onMainMenuClick(e)}>MAIN MENU</button>
      </div>
    </RulesContainer>
  );
}
