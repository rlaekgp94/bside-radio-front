import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { OutlinedInput } from '@mui/material';
import { generateClient } from "aws-amplify/api";
import * as mutations from "../../../graphql/mutations";
import { ByTime, listChatChannels } from "../../../graphql/queries";
import { onCreateChat } from "../../../graphql/subscriptions";
import { CircularProgress } from '@mui/material';
import { getUserInfoAPI, getUserBetTotalAPI, getUserChatableAPI } from 'api/user';
import { getTier } from 'utils/userTier';
import { useTranslation } from 'react-i18next'
import { LANGUAGE_LIST as channelName } from 'constants/language'
const client = generateClient()

function ChatFoot({ channel, userInfo, chatable }) {
  const [value, setValue] = useState("");
  const { t } = useTranslation();

  const onChange = (e)=> {
    const inputValue = e.target.value;
    setValue(inputValue)
  }

  const newChat = () => {
    if (!value || !channel) return;
    client.graphql({
      query: mutations.createChat,
      variables: { input: {
        user: userInfo.email,
        msg: value,
        chatchannelsID: channel,
        create_at: new Date().getTime(),
      }}
    })
    .then(() => {
      setValue("")
    })
  };

  return (
    <div className="option-sidebar-inner__foot">
      <div className="form-input-wrapper chat-message">
        <OutlinedInput
        inputProps={{minLength: 1, maxLength: 159}}
        autoComplete="off"
        placeholder={t('component.chat.placeholder')}
        id="chat-message"
        type="text"
        name="chat-message"
        value={value || ''}
        onChange={onChange}
        onKeyDown={(ev) => {
          if (ev.key === 'Enter') newChat()
        }}
        disabled={!chatable}
        endAdornment={
          <button onClick={newChat} className="send-msg"></button>
        }
        />
        {!chatable && <p className="chat-info">{t('component.chat.depositInfoMsg')}</p>}
      </div>
    </div>
  )
}

let createChat = null;

function ChatBody({ channel, userInfo }) {
  const { t } = useTranslation();
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unreadMsg, setUnreadMsg] = useState([]);
  const [scrollBottom, setScrollBottom] = useState(null);
  const scrollRef = useRef(null);
  const userInfoCache = {};
  const userTierCache = {};


  useEffect(() => {
    return () => {
      if (createChat) {
        createChat.unsubscribe();
      }
    };
  }, []);

  useEffect(() => {
    if (!channel) return;
    setUnreadMsg([]);
    async function init() {
      if (createChat) {
        await createChat.unsubscribe();
      }
    }
    init()
    getChatsList();
  }, [channel]);

  useEffect(() => {
    if (unreadMsg?.length && scrollBottom === 0) {
      updateNewMsg()
    }
  }, [scrollBottom])

  const updateNewMsg = () => {
    setUnreadMsg([]);
    updateChat();
  }
  const updateChat = () => {
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current?.scrollHeight;
      }
    }, 10);
  }

  const getUserBetTotal = async (userId) => {
    let tier;
    if (userTierCache[userId]) {
      tier = userTierCache[userId];
    } else {
      const res = await getUserBetTotalAPI(userId);
      let total = 0;
      if (res?.length) {
        res.forEach(item => { total += item.value-0; })
      }
      tier = getTier(total)
      userTierCache[userId] = tier;
    }
    return tier;
  }

  const getUserInfo = async (userId) => {
    let user;
    if (userInfoCache[userId]) {
      user = userInfoCache[userId];
    } else {
      user = await getUserInfoAPI(userId);
      userInfoCache[userId] = user;
    }
    return user;
  }

  const handleScroll = () => {
    const scrollContainer = scrollRef?.current;
    const newScrollBottom = scrollContainer?.scrollHeight - (scrollContainer?.scrollTop + scrollContainer?.clientHeight);
    setScrollBottom(newScrollBottom);
    return newScrollBottom
  };

  const onChat = () => {
    const createSub = client.graphql({
      query: onCreateChat,
      variables: {
        filter: {chatchannelsID: {eq: channel}}
      }
    })
    .subscribe({
      next: ({ data }) => {
        if (data) {
          setNewChat(data.onCreateChat)
        }
       },
      error: (error) => console.warn("onChat error: ",error)
    });
    createChat = createSub
  }

  const setNewChat = async (data) => {
    const userId = data.user;
    const user = await getUserInfo(userId)
    const tier = await getUserBetTotal(userId)
    const newChatMsg = {
      user: {
        username: user.username,
        userTier: tier
      },
      msg: data.msg,
      chatchannelsID: data.chatchannelsID,
    }

    setChat((prevData) => [...prevData, newChatMsg]);
    const scrollY = handleScroll();
    if (userId === userInfo.email || scrollY === 0) {
      /* current user가 메세지를 보내거나 scroll이 맨 아래에 위치해있을때는 새로운 채팅 바로 노출과 동시에 scroll 맨 아래 유지 */
      updateChat()
    } else if (scrollY !== 0) {
      setUnreadMsg((prevData) => [...prevData, newChatMsg]);
    }
  }

  const getChatsList = async () => {
    setLoading(true);
    try {
      const res = await client.graphql({
        query: ByTime,
        variables: {
          limit: 20,
          chatchannelsID: channel,
          sortDirection: "DESC"
        },
      });

      let list = [];
      const data = res.data.ByTime.items;
      for (const element of data) {
        const userId = element.user;
        const user = await getUserInfo(userId)
        const tier = await getUserBetTotal(userId)
        list.push({
          user: {
            username: user.username,
            userTier: tier
          },
          msg: element.msg,
          chatchannelsID: element.chatchannelsID,
        });
      }
      setChat(list.reverse());
      updateChat();
      onChat();
    } catch (err) {
      console.log("err: ", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="option-sidebar-inner__body" ref={scrollRef} onScroll={handleScroll}>
     <div onClick={updateNewMsg} className={`new-messages-bar ${(!loading && unreadMsg.length) ? "isActive" : ""}`}>
      <p>{unreadMsg?.length ? `${unreadMsg?.length}+ ${t('component.chat.newMsg')}` : ""}</p>
    </div>

    {loading ? (
        <div className="info-center">
          <CircularProgress color="inherit" />
        </div>
      ) : chat?.length === 0 ? (
        <div className="info-center">
          <p>{t('component.chat.noHistory')}</p>
        </div>
      ) : (
        <ul className="message">
          {chat.map((item, index) => {
            return <li key={index} className={`message-item ${item.user.username === userInfo?.username ? "isMe" : ""}`}>
              <img className="user-grade" src={require(`assets/Grade/${item.user.userTier}.png`)} alt={`Grade icon`} />
              <p className="content">{`${item.user.username === userInfo?.username ? t('component.chat.me') : item.user.username}: ${item.msg}`}</p>
            </li>
          })}
        </ul>
      )}

  </div>
  )
}

export default function ChatLayout({closeSidebar}) {
  const user = useSelector(state => { return state?.user; });
  const { userInfo, language } = user;
  const [channels, setChannels] = useState([]);
  const [channel, setChannel] = useState(null);
  const [chatable, setChatable] = useState(true);
  const [showSelectChannel, setShowSelectChannel] = useState(false);
  const [loading, setLoading] = useState(false);

  const getChannelList = async () => {
    setLoading(true);
    try {
      const res = await client.graphql({
        query: listChatChannels,
      });
      if (res?.data) {
        const channelList = res?.data?.listChatChannels?.items
        const currentLang = channelList.find(item => item.lang === language)?.lang;
        setChannels(channelList)
        setChannel(currentLang ?? 'en')
      }
    } catch (err) {
      console.log("err: ", err);
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    getChannelList()
    async function getUserChatable() {
      if (!userInfo?.email) return;
      try {
        const res = await getUserChatableAPI(userInfo.email);
        setChatable(res);
      }
      catch(e) {
        console.log("getUserChatableAPI e: ", e)
      }
    }
    getUserChatable()
    // newChannel("jp")
  }, [])

  // const newChannel = (channel) => {
    // client.graphql({
    //   query: mutations.createChatChannels,
    //   variables: { input: {
    //     id: channel,
    //     type: "chat",
    //     lang: channel,
    //   }}
    // })
    // .then(() => {
    //   console.log("done")
    // })
    // .catch(()=> {
    //   console.log("error")
    // })
  // }

  const changeChannel = (key) => {
    if (key !== channel) {
      setChannel(key)
    }
    if (showSelectChannel) setShowSelectChannel(false)
  };

  const handleOutsideClick = () => {
    setShowSelectChannel(false);
  };

  const useOutsideClick = (callback) => {
    const ref = useRef(null);
    useEffect(() => {
      const handleClick = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          callback();
        }
      };
      document.addEventListener('click', handleClick);
      return () => {
        document.removeEventListener('click', handleClick);
      };
    }, [callback, ref]);

    return ref;
  };
  const ref = useOutsideClick(handleOutsideClick);


  const chatData = { channel, userInfo, chatable }

  return (
    <>
      <div className="option-sidebar-inner__head">
        <div ref={ref} className="channel-wrapper">
          {loading ? <CircularProgress size={24} color="inherit" /> : channel ?
          <div onClick={() => setShowSelectChannel(!showSelectChannel)} className="current-lang">
            {channel ? <img className="symbol" src={require(`assets/Lang/${channel}.png`)} alt={`${channelName[channel]} icon`} /> : null}
            <div className="current">
              <p className="text">{channelName[channel]}</p>
            </div>
          </div> : null}
          {showSelectChannel && <div className="select-lang">
            <ul className="select-lang__list">
              {channels.map((item, index) => (
                <li key={index} onClick={() => changeChannel(item.lang)} className="list-item">
                  {item.lang ? <img className="symbol" src={require(`assets/Lang/${item.lang}.png`)} alt={`${item.lang} icon`} /> : null}
                  <p>{channelName[item.lang]}</p>
                </li>
              ))}
            </ul>
          </div>}
        </div>
        <button className="close-btn" onClick={closeSidebar}></button>
      </div>
      <ChatBody {...chatData} />
      <ChatFoot {...chatData} />
    </>
  )
}