import React, { useState, useEffect } from 'react'
import styles from '../styles/Accessibility.module.css'
import image1 from "../assets/images/up_icon.jpeg"
import { GetUserInfo } from "../../../control/src/zuri-control"
import checkFill from "../assets/images/check-fill.svg"
import checkNotFill from "../assets/images/check-not-fill.svg"
import radioFilled from "../assets/images/radio-fill.svg"
import radioNotFilled from "../assets/images/radio-not-fill.svg"

function Accessibility() {
  // initialstate is the accessibilty settings from GetUserInfo
  const [errorAccessibility, setErrorAccessibility] = useState()
  const [accessbilitySettings, setAccessibilitySettings] = useState({
    animation: true,
    receivedSound: false,
    sentSound: false,
    readOutLoud: true,
    messageControl: {
      bool: true,
      message: "focus_on_last_message"
    }
  })

  useEffect(() => {
    (async () => {
      try {
        const userInfo = await GetUserInfo()
        if (userInfo === {}) throw new Error("No user info")
        const orgId = userInfo[0].org_id
        const memId = userInfo[0]._id
        const userAccessibiltySettings = {
          links: true,
          animation: accessbilitySettings.animation,
          direct_message_announcement: {
            receive_sound: accessbilitySettings.receivedSound,
            send_sound: accessbilitySettings.sentSound,
            read_message: accessbilitySettings.readOutLoud
          },
          press_empty_message_field: accessbilitySettings.messageControl.message
        }
        const userHeader = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`
          }
        }
        // dispatch(
        //   setUserAccessibilitySettings(
        //     `https://api.zuri.chat/organizations/${orgId}/members/${memId}/settings/accessibility`,
        //     userAccessibiltySettings,
        //     userHeader
        //   )
        // )
        // dispatch(getUserInfo())
      } catch (err) {
        setErrorAccessibility(err)
      }
    });
    return () => {}
  }, [accessbilitySettings])

  return (
    <div>
      <div className={styles.containerAccessibility}>
        <div>
          <h3 className={styles.animationH3}>Animation</h3>
          <form action="">
            <div className={styles.imagesAndEmojis}>
              <input
                className={styles.accessibilityCheckbox}
                type="checkbox"
                checked="checked"
                name=""
                value="Allow animated images and emojis"
              />
              <label className={styles.accessibilityLabel}>
                Allow animated images and emojis
              </label>
            </div>
          </form>
        </div>
        <hr className={styles.hrLine} />

        <div>
          <h3 className={styles.directH3}>Direct message announcement</h3>
          <p className={styles.accessibilityP}>
            Choose which sounds and announcements you'd like to receive while
            using a
            <br />
            screen reader inside a direct message.
          </p>
          <form action="">
            <div className={styles.imagesAndEmojis}>
              <input
                className={styles.accessibilityCheckbox}
                type="checkbox"
                name=""
                value="Play a sound when a message is received"
              />
              <label className={styles.accessibilityLabel}>
                Play a sound when a message is received
              </label>
            </div>
            <div className={styles.imagesAndEmojis}>
              <input
                className={styles.accessibilityCheckbox}
                type="checkbox"
                name=""
                value="Play a sound when a message is sent"
              />
              <label className={styles.accessibilityLabel}>
                Play a sound when a message is sent
              </label>
            </div>
            <div className={styles.imagesAndEmojis}>
              <input
                className={styles.accessibilityCheckbox}
                type="checkbox"
                checked="checked"
                name=""
                value="Read incoming message out loud"
              />
              <label className={styles.accessibilityLabel}>
                Read incoming message out loud
              </label>
            </div>
          </form>
        </div>
        <hr className={styles.hrLine} />

        <div>
          <h3 className={styles.keyboardH3}>Keyboard</h3>
          <p className={styles.accessibilityP}>
            You can improve the way you use Zurichat by learning our{' '}
            <span id={styles.handyKeyboard}>handy keyboard shortcuts.</span>
          </p>

          <hr className={styles.hrLine} />

          <h3 className={styles.pressH3}>
            Press <img src={image1} alt="upicon" className={styles.image1} /> in the empty message field to:
          </h3>
          <form action="">
            <div className={styles.imagesAndEmojis}>
              <input
                className={styles.accessibilityRadio}
                type="radio"
                checked="checked"
                name="accessradio"
                value="Move focus to the message list"
              />
              <label className={styles.accessibilityRadioLabel}>
                Move focus to the message list
              </label>
              <p className={styles.accessibilityP} id={styles.accessibilityPId}>
                The last visible message in the list will be selected
              </p>
            </div>
            <div className={styles.imagesAndEmojis}>
              <input
                className={styles.accessibilityRadio}
                type="radio"
                name="accessradio"
                value="Edit your last message"
              />
              <label className={styles.accessibilityRadioLabel}>
                Edit your last message
              </label>
              <p
                className={styles.accessibilityP}
                id={styles.accessibilityPId2}
              >
                The last visible message you sent will be selected and in the
                editing mode
              </p>
            </div>
          </form>

          <p className={styles.accessibilityQ} id={styles.noteP}>
            Note: press
            <span className={styles.accessibilityEsc}> Ctrl </span>
            <span className={styles.accessibilityEsc} id={styles.exclamation}>
              {' '}
              !{' '}
            </span>{' '}
            to edit your last message, with either option.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Accessibility
