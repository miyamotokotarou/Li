import React, { useState, useEffect, useRef } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, query, orderBy, onSnapshot, addDoc, serverTimestamp, doc, setDoc, getDoc } from 'firebase/firestore';
import { QrCode, MessageSquare, Users, Phone, UserPlus, Copy } from 'lucide-react'; // アイコンライブラリ

// Firebase設定はCanvas環境から提供されます
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

// Firebaseアプリの初期化
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// メインアプリケーションコンポーネント
const App = () => {
    const [user, setUser] = useState(null); // 現在の認証ユーザー
    const [userId, setUserId] = useState(null); // Firestoreで使用するユーザーID
    const [isAuthReady, setIsAuthReady] = useState(false); // 認証準備完了フラグ
    const [messages, setMessages] = useState([]); // 表示するメッセージリスト
    const [newMessage, setNewMessage] = useState(''); // 新しいメッセージ入力値
    const [activeChatType, setActiveChatType] = useState('general'); // 'general' (全体チャット) or 'private' (個人チャット)
    const [selectedFriendId, setSelectedFriendId] = useState(null); // 個人チャットの相手ID
    const [friends, setFriends] = useState([]); // 友だちリスト (簡易的なモックデータ)
    const [qrCodeData, setQrCodeData] = useState(''); // 自分のQRコードデータ
    const [showQrModal, setShowQrModal] = useState(false); // QRコードモーダルの表示状態
    const messagesEndRef = useRef(null); // メッセージリストのスクロール用参照

    // Firebase認証とFirestore初期化
    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                // 認証ユーザーのUIDをuserIdとして使用
                setUserId(currentUser.uid);
                console.log('Firebase Auth User ID:', currentUser.uid);

                // ユーザーがFirestoreに存在するか確認し、存在しなければ作成
                const userDocRef = doc(db, `artifacts/${appId}/users/${currentUser.uid}/profile`, 'data');
                const userDocSnap = await getDoc(userDocRef);

                if (!userDocSnap.exists()) {
                    await setDoc(userDocRef, {
                        uid: currentUser.uid,
                        name: `User_${currentUser.uid.substring(0, 5)}`, // 簡易的なユーザー名
                        createdAt: serverTimestamp()
                    });
                    console.log('New user profile created in Firestore.');
                } else {
                    console.log('User profile already exists in Firestore.');
                }

                // 自分のQRコードデータを設定
                setQrCodeData(`friend_add:${currentUser.uid}`);

            } else {
                // 認証トークンがない場合は匿名でサインイン
                try {
                    if (initialAuthToken) {
                        await signInWithCustomToken(auth, initialAuthToken);
                        console.log('Signed in with custom token.');
                    } else {
                        await signInAnonymously(auth);
                        console.log('Signed in anonymously.');
                    }
                } catch (error) {
                    console.error('認証エラー:', error);
                }
            }
            setIsAuthReady(true);
        });

        // クリーンアップ関数
        return () => unsubscribeAuth();
    }, []); // 空の依存配列でコンポーネトマウント時に一度だけ実行

    // メッセージのリアルタイムリスナー
    useEffect(() => {
        if (!isAuthReady || !userId) return; // 認証が完了していない場合は何もしない

        let q;
        let chatCollectionPath;

        if (activeChatType === 'general') {
            // 全体チャットのパス
            chatCollectionPath = `artifacts/${appId}/public/data/general_chat`;
            q = query(collection(db, chatCollectionPath), orderBy('timestamp'));
        } else if (activeChatType === 'private' && selectedFriendId) {
            // 個人チャットのパス (ユーザーIDをソートして一意なチャットルームを作成)
            const chatRoomId = [userId, selectedFriendId].sort().join('_');
            chatCollectionPath = `artifacts/${appId}/public/data/private_chats/${chatRoomId}/messages`;
            q = query(collection(db, chatCollectionPath), orderBy('timestamp'));
        } else {
            return; // 不正なチャットタイプまたは友だち未選択
        }

        console.log(`Listening to chat at: ${chatCollectionPath}`);

        const unsubscribeMessages = onSnapshot(q, (snapshot) => {
            const fetchedMessages = [];
            snapshot.forEach((doc) => {
                fetchedMessages.push({ id: doc.id, ...doc.data() });
            });
            setMessages(fetchedMessages);
            console.log('Messages updated:', fetchedMessages.length);
        }, (error) => {
            console.error('メッセージ取得エラー:', error);
        });

        return () => unsubscribeMessages(); // クリーンアップ
    }, [isAuthReady, userId, activeChatType, selectedFriendId]);

    // メッセージが更新されたら一番下までスクロール
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // メッセージ送信ハンドラ
    const handleSendMessage = async () => {
        if (newMessage.trim() === '' || !userId) return;

        let chatCollectionRef;
        if (activeChatType === 'general') {
            chatCollectionRef = collection(db, `artifacts/${appId}/public/data/general_chat`);
        } else if (activeChatType === 'private' && selectedFriendId) {
            const chatRoomId = [userId, selectedFriendId].sort().join('_');
            chatCollectionRef = collection(db, `artifacts/${appId}/public/data/private_chats/${chatRoomId}/messages`);
        } else {
            console.error('メッセージを送信するチャットが見つかりません。');
            return;
        }

        try {
            await addDoc(chatCollectionRef, {
                senderId: userId,
                text: newMessage,
                timestamp: serverTimestamp(), // サーバータイムスタンプ
                senderName: user?.displayName || `User_${userId.substring(0, 5)}` // ユーザー名も保存
            });
            setNewMessage('');
            console.log('Message sent successfully!');
        } catch (error) {
            console.error('メッセージ送信エラー:', error);
        }
    };

    // 友だちリストのモックデータと選択ハンドラ
    useEffect(() => {
        // 実際のアプリでは、Firestoreから友だちリストを取得します
        // ここでは簡易的なモックデータを使用
        if (userId) {
            const mockFriends = [
                { id: 'friend123', name: '田中さん' },
                { id: 'friend456', name: '佐藤さん' },
                { id: 'friend789', name: '鈴木さん' },
            ].filter(f => f.id !== userId); // 自分自身は友だちリストから除外
            setFriends(mockFriends);
        }
    }, [userId]);

    // 個人チャット選択ハンドラ
    const handleSelectFriend = (friendId) => {
        setSelectedFriendId(friendId);
        setActiveChatType('private');
        setMessages([]); // チャット切り替え時にメッセージをクリア
    };

    // QRコードモーダル表示/非表示
    const toggleQrModal = () => {
        setShowQrModal(!showQrModal);
    };

    // QRコードデータをクリップボードにコピー
    const copyQrDataToClipboard = () => {
        if (qrCodeData) {
            // navigator.clipboard.writeTextはiFrameで制限される場合があるため、execCommandを使用
            const textarea = document.createElement('textarea');
            textarea.value = qrCodeData;
            document.body.appendChild(textarea);
            textarea.select();
            try {
                document.execCommand('copy');
                alert('QRコードデータがクリップボードにコピーされました！'); // 簡易的な通知
            } catch (err) {
                console.error('クリップボードへのコピーに失敗しました:', err);
                alert('クリップボードへのコピーに失敗しました。手動でコピーしてください: ' + qrCodeData);
            }
            document.body.removeChild(textarea);
        }
    };

    // QRコード生成 (簡易的なSVG生成)
    const generateQrCodeSvg = (data) => {
        // ここでは簡単なSVGを生成するだけですが、実際にはQRコードライブラリを使用します
        // 例: 'qrcode.js' や 'react-qr-code'
        // 簡単な表示例として、データが短い場合は直接表示
        if (!data) return null;
        const size = 150;
        return (
            <svg viewBox="0 0 100 100" width={size} height={size} className="bg-white rounded-lg p-2">
                <rect x="0" y="0" width="100" height="100" fill="#fff" />
                <text x="50" y="50" fontSize="10" textAnchor="middle" fill="#000">
                    {data.substring(0, 15)}...
                </text>
                <text x="50" y="70" fontSize="8" textAnchor="middle" fill="#000">
                    (QRコードデータ)
                </text>
            </svg>
        );
    };


    if (!isAuthReady) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
                <p>読み込み中...</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-inter">
            {/* ヘッダー */}
            <header className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow-md rounded-b-lg">
                <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    <MessageSquare className="inline-block mr-2" size={28} />
                    LINE風チャット
                </h1>
                <div className="flex items-center space-x-4">
                    {userId && (
                        <span className="text-sm">
                            あなたのID: <span className="font-mono bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-md">{userId}</span>
                        </span>
                    )}
                    <button
                        onClick={toggleQrModal}
                        className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-md transition-all duration-300 transform hover:scale-105"
                        title="QRコードで友だち追加"
                    >
                        <UserPlus size={20} />
                    </button>
                </div>
            </header>

            {/* メインコンテンツエリア */}
            <div className="flex flex-1 overflow-hidden">
                {/* サイドバー (友だちリスト/チャットタイプ選択) */}
                <aside className="w-1/4 bg-white dark:bg-gray-800 p-4 border-r border-gray-200 dark:border-gray-700 overflow-y-auto rounded-tr-lg rounded-br-lg shadow-lg">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-300">チャット</h2>
                    <nav className="mb-6">
                        <ul>
                            <li className="mb-2">
                                <button
                                    onClick={() => { setActiveChatType('general'); setSelectedFriendId(null); setMessages([]); }}
                                    className={`flex items-center w-full p-3 rounded-lg transition-colors duration-200 ${activeChatType === 'general' ? 'bg-blue-100 text-blue-700 dark:bg-blue-700 dark:text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300'}`}
                                >
                                    <MessageSquare className="mr-3" size={20} />
                                    全体チャット
                                </button>
                            </li>
                            <li className="mb-2">
                                <button
                                    onClick={() => setActiveChatType('private')}
                                    className={`flex items-center w-full p-3 rounded-lg transition-colors duration-200 ${activeChatType === 'private' ? 'bg-blue-100 text-blue-700 dark:bg-blue-700 dark:text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300'}`}
                                >
                                    <Users className="mr-3" size={20} />
                                    個人チャット
                                </button>
                            </li>
                            <li className="mb-2">
                                <button
                                    className="flex items-center w-full p-3 rounded-lg transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 opacity-50 cursor-not-allowed"
                                    disabled
                                >
                                    <Phone className="mr-3" size={20} />
                                    通話機能 (未実装)
                                </button>
                            </li>
                        </ul>
                    </nav>

                    {activeChatType === 'private' && (
                        <>
                            <h3 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-300">友だちリスト</h3>
                            <ul>
                                {friends.length > 0 ? (
                                    friends.map((friend) => (
                                        <li key={friend.id} className="mb-2">
                                            <button
                                                onClick={() => handleSelectFriend(friend.id)}
                                                className={`flex items-center w-full p-3 rounded-lg transition-colors duration-200 ${selectedFriendId === friend.id ? 'bg-green-100 text-green-700 dark:bg-green-700 dark:text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300'}`}
                                            >
                                                <UserPlus className="mr-3" size={20} /> {/* 友だちアイコン */}
                                                {friend.name}
                                            </button>
                                        </li>
                                    ))
                                ) : (
                                    <p className="text-sm text-gray-500 dark:text-gray-400">友だちがいません。</p>
                                )}
                            </ul>
                        </>
                    )}
                </aside>

                {/* チャットウィンドウ */}
                <main className="flex-1 flex flex-col bg-gray-50 dark:bg-gray-900 rounded-lg shadow-inner">
                    <div className="flex-1 p-4 overflow-y-auto custom-scrollbar">
                        {messages.length === 0 && (
                            <div className="text-center text-gray-500 dark:text-gray-400 mt-10">
                                <p>メッセージがありません。</p>
                                {activeChatType === 'private' && !selectedFriendId && (
                                    <p>左の友だちリストからチャット相手を選択してください。</p>
                                )}
                            </div>
                        )}
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex mb-4 ${msg.senderId === userId ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-xs lg:max-w-md p-3 rounded-xl shadow-md ${
                                        msg.senderId === userId
                                            ? 'bg-blue-500 text-white rounded-br-none'
                                            : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none'
                                    }`}
                                >
                                    <p className="font-bold text-sm mb-1">
                                        {msg.senderId === userId ? 'あなた' : msg.senderName || `User_${msg.senderId?.substring(0, 5)}`}
                                    </p>
                                    <p className="break-words">{msg.text}</p>
                                    <p className="text-xs text-right mt-1 opacity-75">
                                        {msg.timestamp?.toDate ? msg.timestamp.toDate().toLocaleTimeString() : '送信中...'}
                                    </p>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} /> {/* スクロールターゲット */}
                    </div>

                    {/* メッセージ入力エリア */}
                    <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 rounded-t-lg shadow-md">
                        <div className="flex space-x-3">
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                placeholder={activeChatType === 'general' ? '全体チャットにメッセージを入力...' : selectedFriendId ? `${friends.find(f => f.id === selectedFriendId)?.name}にメッセージを入力...` : 'チャット相手を選択してください...'}
                                className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                                disabled={activeChatType === 'private' && !selectedFriendId}
                            />
                            <button
                                onClick={handleSendMessage}
                                className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
                                disabled={newMessage.trim() === '' || (activeChatType === 'private' && !selectedFriendId)}
                            >
                                送信
                            </button>
                        </div>
                    </div>
                </main>
            </div>

            {/* QRコードモーダル */}
            {showQrModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl text-center relative max-w-md w-full mx-4">
                        <button
                            onClick={toggleQrModal}
                            className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                        >
                            &times;
                        </button>
                        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
                            <QrCode className="inline-block mr-2" size={28} />
                            あなたのQRコード
                        </h2>
                        <p className="mb-4 text-gray-600 dark:text-gray-300">
                            このQRコードを友だちにスキャンしてもらい、友だち追加できます。
                        </p>
                        <div className="flex justify-center mb-6">
                            {generateQrCodeSvg(qrCodeData)}
                        </div>
                        <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg mb-4 break-all text-sm font-mono text-gray-700 dark:text-gray-300">
                            <p>{qrCodeData}</p>
                        </div>
                        <button
                            onClick={copyQrDataToClipboard}
                            className="flex items-center justify-center w-full p-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
                        >
                            <Copy className="mr-2" size={20} />
                            QRコードデータをコピー
                        </button>
                        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                            ※このQRコードはデモ用です。実際には画像を生成します。
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default App;
