import React, { useState } from 'react';
import NeutralizationSim from './components/NeutralizationSim';
import UnitVolumeQuiz from './components/UnitVolumeQuiz';
import CSATDataQuiz from './components/CSATDataQuiz';
import KillerLogicEngine from './components/KillerLogicEngine';

function App() {
    const [activeTab, setActiveTab] = useState('sim1');

    return (
        <div style={{ fontFamily: 'Pretendard, -apple-system, sans-serif', minHeight: '100vh', backgroundColor: '#e6f7ff', padding: '20px 0' }}>

            {/* 고정 네비게이션(탭) 바 */}
            <div style={{ maxWidth: '1000px', margin: '0 auto 20px', backgroundColor: '#fff', borderRadius: '12px', padding: '15px', display: 'flex', gap: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
                <button
                    onClick={() => setActiveTab('sim1')}
                    style={{
                        flex: 1, padding: '15px', fontSize: '1.2em', fontWeight: 'bold',
                        borderRadius: '8px', border: 'none', cursor: 'pointer', transition: 'all 0.3s',
                        backgroundColor: activeTab === 'sim1' ? '#1890ff' : '#f0f0f0',
                        color: activeTab === 'sim1' ? '#fff' : '#666',
                        boxShadow: activeTab === 'sim1' ? '0 4px 8px rgba(24,144,255,0.3)' : 'none'
                    }}
                >
                    실험실 1단계: 이온 수 변화 관찰 (기본)
                </button>
                <button
                    onClick={() => setActiveTab('quiz2')}
                    style={{
                        flex: 1, padding: '15px', fontSize: '1.2em', fontWeight: 'bold',
                        borderRadius: '8px', border: 'none', cursor: 'pointer', transition: 'all 0.3s',
                        backgroundColor: activeTab === 'quiz2' ? '#722ed1' : '#f0f0f0',
                        color: activeTab === 'quiz2' ? '#fff' : '#666',
                        boxShadow: activeTab === 'quiz2' ? '0 4px 8px rgba(114,46,209,0.3)' : 'none'
                    }}
                >
                    실험실 2단계: 단위 부피당 이온 수 퀴즈
                </button>
                <button
                    onClick={() => setActiveTab('csat3')}
                    style={{
                        flex: 1, padding: '15px', fontSize: '1.2em', fontWeight: 'bold',
                        borderRadius: '8px', border: 'none', cursor: 'pointer', transition: 'all 0.3s',
                        backgroundColor: activeTab === 'csat3' ? '#874d00' : '#f0f0f0',
                        color: activeTab === 'csat3' ? '#fff' : '#666',
                        boxShadow: activeTab === 'csat3' ? '0 4px 8px rgba(135,77,0,0.3)' : 'none'
                    }}
                >
                    실험실 3단계: 수능형 자료 해석 훈련
                </button>
                <button
                    onClick={() => setActiveTab('killer4')}
                    style={{
                        flex: 1, padding: '15px', fontSize: '1.2em', fontWeight: 'bold',
                        borderRadius: '8px', border: 'none', cursor: 'pointer', transition: 'all 0.3s',
                        backgroundColor: activeTab === 'killer4' ? '#000' : '#f0f0f0',
                        color: activeTab === 'killer4' ? '#fff' : '#666',
                        boxShadow: activeTab === 'killer4' ? '0 4px 8px rgba(0,0,0,0.3)' : 'none'
                    }}
                >
                    실험실 4단계: 가설 검증 엔진
                </button>
            </div>

            {/* 탭 콘텐츠 영역 */}
            <div>
                {activeTab === 'sim1' && <NeutralizationSim />}
                {activeTab === 'quiz2' && <UnitVolumeQuiz />}
                {activeTab === 'csat3' && <CSATDataQuiz />}
                {activeTab === 'killer4' && <KillerLogicEngine />}
            </div>

        </div>
    );
}

export default App;
