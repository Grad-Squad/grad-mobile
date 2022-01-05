import React, { useEffect, useState } from 'react';
import addShakeListener from 'utility/shakeListener';
import WhatIsSent from './WhatIsSent';
import SendFeedback from './SendFeedback';
import ThankYou from './ThankYou';

const Feedback = ({ navigationRef }) => {
  const [sendFeedbackVisible, setSendFeedbackVisible] = useState(false);
  const [whatIsSentVisible, setWhatIsSentVisible] = useState(false);
  const [thankyouVisible, setThankyouVisible] = useState(false);

  useEffect(() => {
    const subscription = addShakeListener(() => {
      setSendFeedbackVisible(true);
    });
    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <>
      <SendFeedback
        navigationRef={navigationRef}
        modalVisible={sendFeedbackVisible}
        setModalVisible={setSendFeedbackVisible}
        showWhatIsSent={() => {
          setWhatIsSentVisible(true);
        }}
        switchToThankyou={() => {
          setSendFeedbackVisible(false);
          setThankyouVisible(true);
        }}
      />
      <WhatIsSent
        modalVisible={whatIsSentVisible}
        setModalVisible={setWhatIsSentVisible}
      />
      <ThankYou
        modalVisible={thankyouVisible}
        setModalVisible={setThankyouVisible}
      />
    </>
  );
};

export default Feedback;
