import React, { useState, useMemo, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';

// 이온 정보 팝업용 데이터
const ION_INFO = {
  'H⁺': { name: '수소 이온', type: '알짜 이온', desc: '산성을 띠게 하는 이온이며, OH⁻와 만나 물이 됩니다.' },
  'Cl⁻': { name: '염화 이온', type: '구경꾼 이온', desc: '반응에 참여하지 않고 용액에 그대로 남아있는 이온입니다.' },
  'Na⁺': { name: '나트륨 이온', type: '구경꾼 이온', desc: '반응에 참여하지 않고 용액에 계속 누적되는 이온입니다.' },
  'OH⁻': { name: '수산화 이온', type: '알짜 이온', desc: '염기성을 띠게 하는 이온이며, H⁺와 만나 물이 됩니다.' },
};

const NeutralizationSim = () => {
  const initialHCl = 10;
  const [addedNaOH, setAddedNaOH] = useState(0);

  // UI 상태 관리
  const [showHint, setShowHint] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [selectedIon, setSelectedIon] = useState(null);

  const ionPositions = useMemo(() => {
    const pos = {};
    ['H⁺', 'Cl⁻', 'Na⁺', 'OH⁻'].forEach(type => {
      pos[type] = Array.from({ length: 40 }).map(() => ({
        left: `${Math.random() * 80 + 10}%`,
        bottom: `${Math.random() * 80 + 10}%`,
        animationDelay: `${Math.random() * 2}s`,
        animationDuration: `${2 + Math.random() * 2}s`
      }));
    });
    return pos;
  }, []);

  const data = useMemo(() => {
    const points = [];
    for (let i = 0; i <= 20; i++) {
      const hPlus = Math.max(0, initialHCl - i);
      const clMinus = initialHCl;
      const naPlus = i;
      const ohMinus = Math.max(0, i - initialHCl);
      const totalIons = hPlus + clMinus + naPlus + ohMinus;

      const temp = i <= initialHCl
        ? 20 + (i * 0.8)
        : 28 - ((i - initialHCl) * 0.4);

      points.push({
        volume: i,
        'H⁺': hPlus,
        'Cl⁻': clMinus,
        'Na⁺': naPlus,
        'OH⁻': ohMinus,
        '전체 이온 수': totalIons,
        '온도(°C)': Number(temp.toFixed(1)),
      });
    }
    return points;
  }, [initialHCl]);

  useEffect(() => {
    if (!document.getElementById('float-style')) {
      const style = document.createElement('style');
      style.id = 'float-style';
      style.innerHTML = `
        @keyframes float {
          0% { transform: translate(0, 0); }
          50% { transform: translate(3px, -8px); }
          100% { transform: translate(-3px, 5px); }
        }
        .graph-line:hover { cursor: pointer; stroke-width: 5px !important; }
        @keyframes pulse-yellow {
          0% { box-shadow: 0 0 0 0 rgba(255, 235, 59, 0.7); }
          70% { box-shadow: 0 0 0 15px rgba(255, 235, 59, 0); }
          100% { box-shadow: 0 0 0 0 rgba(255, 235, 59, 0); }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  const renderIons = (type, count, color) => {
    return Array.from({ length: count }).map((_, i) => (
      <div key={`${type}-${i}`} style={{
        position: 'absolute', left: ionPositions[type][i].left, bottom: ionPositions[type][i].bottom,
        width: '24px', height: '24px', backgroundColor: color, color: 'white', fontSize: '11px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        borderRadius: '50%', fontWeight: 'bold', boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        animation: `float ${ionPositions[type][i].animationDuration} infinite ease-in-out alternate`,
        animationDelay: ionPositions[type][i].animationDelay,
      }}>
        {type}
      </div>
    ));
  };

  // Recharts 커스텀 툴팁
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ backgroundColor: '#fff', padding: '10px', border: '1px solid #ccc', borderRadius: '5px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
          <p style={{ margin: 0, fontWeight: 'bold', borderBottom: '1px solid #eee', paddingBottom: '5px', marginBottom: '5px' }}>NaOH 부피: {label} mL</p>
          {payload.map((entry, index) => (
            <div key={index} style={{ margin: '3px 0', color: entry.color, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>{entry.name}:</span>
              <strong style={{ marginLeft: '10px' }}>{entry.value} {entry.name.includes('온도') ? '' : '개'}</strong>
            </div>
          ))}
          <p style={{ margin: '8px 0 0 0', fontSize: '0.85em', color: '#888', fontStyle: 'italic' }}>* 범례(Legend) 클릭 시 설명표시</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f2f5', borderRadius: '12px', maxWidth: '1000px', margin: '0 auto', fontFamily: 'Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", sans-serif' }}>
      <h2 style={{ textAlign: 'center', color: '#1f1f1f', marginBottom: '10px' }}>🧪 산&middot;염기 중화반응 1단계 시뮬레이터</h2>
      <p style={{ textAlign: 'center', color: '#555', marginBottom: '30px' }}>일정한 양의 HCl에 NaOH를 조금씩 넣을 때의 상태 변화와 이온수, 온도를 관찰하세요.</p>

      {/* 슬라이더 컨트롤 */}
      <div style={{ marginBottom: '40px', textAlign: 'center', padding: '20px', backgroundColor: '#fff', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
        <label style={{ fontWeight: 'bold', fontSize: '1.4em' }}>
          NaOH 첨가량: <span style={{ color: '#1890ff', fontSize: '1.2em' }}>{addedNaOH}</span> mL
        </label>
        <input
          type="range" min="0" max="20" value={addedNaOH}
          onChange={(e) => setAddedNaOH(Number(e.target.value))}
          style={{ width: '80%', display: 'block', margin: '20px auto 0', cursor: 'pointer', height: '8px', accentColor: '#1890ff' }}
        />
      </div>

      {/* 상태 요약 및 비커 컨테이너 */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px', justifyContent: 'center', marginBottom: '30px' }}>

        {/* 비커 영역 */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
          <div style={{ fontWeight: 'bold', marginBottom: '10px', fontSize: '1.1em' }}>반응 용기 (비커)</div>
          <div style={{
            width: '200px', height: '240px', border: '5px solid #b0bec5', borderTop: 'none',
            borderRadius: '0 0 24px 24px', position: 'relative', overflow: 'hidden', backgroundColor: '#fafafa',
            boxShadow: 'inset 0 -10px 20px rgba(0,0,0,0.05)',
            // 중화점 강조 애니메이션
            animation: addedNaOH === 10 ? 'pulse-yellow 2s infinite' : 'none'
          }}>
            <div style={{
              position: 'absolute', bottom: 0, width: '100%', height: `${40 + addedNaOH * 2}%`,
              // 중성일 때 노란색(또는 초록빛 황색) 강조
              backgroundColor: addedNaOH < 10 ? 'rgba(255, 182, 193, 0.35)' : addedNaOH === 10 ? 'rgba(255, 235, 59, 0.45)' : 'rgba(173, 216, 230, 0.35)',
              transition: 'height 0.3s ease-in-out, background-color 0.5s',
              borderTop: '3px solid rgba(255,255,255,0.7)'
            }}>
              {renderIons('H⁺', data[addedNaOH]['H⁺'], '#ff4d4f')}
              {renderIons('Cl⁻', data[addedNaOH]['Cl⁻'], '#8c8c8c')}
              {renderIons('Na⁺', data[addedNaOH]['Na⁺'], '#1890ff')}
              {renderIons('OH⁻', data[addedNaOH]['OH⁻'], '#73d13d')}
            </div>
            {/* 중화 완료 메시지 오버레이 */}
            {addedNaOH === 10 && (
              <div style={{
                position: 'absolute', top: '35%', left: '50%', transform: 'translate(-50%, -50%)',
                backgroundColor: 'rgba(56, 158, 13, 0.9)', color: 'white', padding: '8px 16px',
                borderRadius: '20px', fontWeight: 'bold', fontSize: '1.2em', whiteSpace: 'nowrap',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)', transition: 'all 0.3s'
              }}>
                🎊 중화 완료! 🎊
              </div>
            )}
          </div>
        </div>

        {/* 상태 요약 창 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', justifyContent: 'center', minWidth: '350px' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <div style={{
              flex: 1, padding: '15px', border: '1px solid #ccc', borderRadius: '8px',
              backgroundColor: addedNaOH < 10 ? '#ffe6e6' : addedNaOH === 10 ? '#fff9c4' : '#e6f2ff',
              textAlign: 'center', fontSize: '1.2em', boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}>
              <strong>현재 액성:</strong> <br />
              <span style={{ fontSize: '1.3em', fontWeight: 'bold', color: addedNaOH < 10 ? '#ff4d4f' : addedNaOH === 10 ? '#d4b106' : '#1890ff' }}>
                {addedNaOH < 10 ? '산성' : addedNaOH === 10 ? '중성' : '염기성'}
              </span>
            </div>
            <div style={{ flex: 1, padding: '15px', border: '1px solid #ccc', borderRadius: '8px', textAlign: 'center', backgroundColor: '#fff', fontSize: '1.2em', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
              <strong>전체 이온 수:</strong><br />
              <span style={{ fontSize: '1.3em', fontWeight: 'bold' }}>{data[addedNaOH]['전체 이온 수']}개</span>
            </div>
            <div style={{ flex: 1, padding: '15px', border: '1px solid #ccc', borderRadius: '8px', textAlign: 'center', backgroundColor: '#fff', fontSize: '1.2em', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
              <strong>현재 온도:</strong><br />
              <span style={{ fontSize: '1.3em', fontWeight: 'bold', color: '#fa8c16' }}>{data[addedNaOH]['온도(°C)']} °C</span>
            </div>
          </div>

          <div style={{ padding: '20px', border: '2px solid #91d5ff', borderRadius: '12px', backgroundColor: '#e6f7ff', fontSize: '1.05em', lineHeight: '1.6', boxShadow: '0 4px 12px rgba(24,144,255,0.1)' }}>
            <div style={{ fontWeight: 'bold', color: '#096dd9', marginBottom: '10px', fontSize: '1.1em' }}>💡 액성별 핵심 포인트 분석</div>
            <ul style={{ paddingLeft: '20px', margin: '0' }}>
              {addedNaOH < 10 && (
                <><li>[산의 구경꾼 이온(Cl⁻)] = [염기의 구경꾼 이온(Na⁺)] + [H⁺]</li>
                  <li style={{ color: '#ff4d4f', fontWeight: 'bold' }}>생성된 물 분자수 = 염기의 구경꾼 이온 수(Na⁺)</li></>
              )}
              {addedNaOH === 10 && (
                <><li>[산의 구경꾼 이온(Cl⁻)] = [염기의 구경꾼 이온(Na⁺)]</li>
                  <li style={{ color: '#d4b106', fontWeight: 'bold' }}>생성된 물 분자수 = [Cl⁻] = [Na⁺] (최대치)</li></>
              )}
              {addedNaOH > 10 && (
                <><li>[산의 구경꾼 이온(Cl⁻)] + [OH⁻] = [염기의 구경꾼 이온(Na⁺)]</li>
                  <li style={{ color: '#1890ff', fontWeight: 'bold' }}>생성된 물 분자수 = 산의 구경꾼 이온 수(Cl⁻)</li></>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* 통합 그래프 영역 */}
      <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', marginBottom: '30px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', paddingBottom: '10px', borderBottom: '1px solid #eee' }}>
          <h3 style={{ margin: 0, color: '#1f1f1f' }}>📊 종합 반응 그래프 <span style={{ fontSize: '0.7em', color: '#fa8c16' }}>(온도 포함)</span></h3>
          <span style={{ fontSize: '0.9em', color: '#1890ff', backgroundColor: '#e6f7ff', padding: '5px 10px', borderRadius: '16px', fontWeight: 'bold' }}>
            👆 위 범례(Legend)의 이온 이름을 클릭하면 상세 설명이 나옵니다
          </span>
        </div>

        {/* 팝업 정보 영역 (이온 클릭 시) */}
        {selectedIon && ION_INFO[selectedIon] && (
          <div style={{ marginBottom: '20px', padding: '15px 20px', backgroundColor: '#f6ffed', borderRadius: '8px', border: '1px solid #b7eb8f', display: 'flex', justifyContent: 'space-between', alignItems: 'center', animation: 'fadeIn 0.3s' }}>
            <div>
              <h4 style={{ margin: '0 0 5px 0', color: '#389e0d', fontSize: '1.1em' }}>{selectedIon} ({ION_INFO[selectedIon].name}) - <span style={{ color: ION_INFO[selectedIon].type === '알짜 이온' ? '#cf1322' : '#096dd9' }}>{ION_INFO[selectedIon].type}</span></h4>
              <p style={{ margin: 0, color: '#555' }}>{ION_INFO[selectedIon].desc}</p>
            </div>
            <button onClick={() => setSelectedIon(null)} style={{ padding: '6px 16px', cursor: 'pointer', backgroundColor: '#fff', border: '1px solid #d9d9d9', borderRadius: '4px' }}>닫기</button>
          </div>
        )}

        <ResponsiveContainer width="100%" height={450}>
          <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e0e0e0" />
            <XAxis dataKey="volume" label={{ value: 'NaOH 부피(mL)', position: 'insideBottom', offset: -15 }} tick={{ fill: '#666' }} />

            {/* 기본 Y축: 이온 수 */}
            <YAxis yAxisId="left" label={{ value: '이온 수(개)', angle: -90, position: 'insideLeft', offset: 15 }} tick={{ fill: '#666' }} />
            {/* 보조 Y축: 온도 */}
            <YAxis yAxisId="right" orientation="right" domain={[15, 35]} label={{ value: '온도 (°C)', angle: 90, position: 'insideRight', offset: 15 }} tick={{ fill: '#fa8c16' }} />

            <RechartsTooltip content={<CustomTooltip />} />

            {/* Legend 클릭 이벤트 연결 */}
            <Legend
              verticalAlign="top" height={40}
              onClick={(e) => setSelectedIon(e.dataKey !== '전체 이온 수' && e.dataKey !== '온도(°C)' ? e.dataKey : null)}
              wrapperStyle={{ cursor: 'pointer', paddingTop: '10px' }}
            />

            <ReferenceLine yAxisId="left" x={10} stroke="#d4b106" strokeWidth={2} strokeDasharray="4 4" label={{ position: 'top', value: '중화점', fill: '#d4b106', fontWeight: 'bold', fontSize: '1.1em', dy: -10 }} />

            <Line yAxisId="left" type="monotone" dataKey="H⁺" stroke="#ff4d4f" strokeWidth={3} dot={false} activeDot={{ r: 6 }} className="graph-line" />
            <Line yAxisId="left" type="monotone" dataKey="Cl⁻" stroke="#8c8c8c" strokeWidth={3} dot={false} activeDot={{ r: 6 }} className="graph-line" />
            <Line yAxisId="left" type="monotone" dataKey="Na⁺" stroke="#1890ff" strokeWidth={3} dot={false} activeDot={{ r: 6 }} className="graph-line" />
            <Line yAxisId="left" type="monotone" dataKey="OH⁻" stroke="#73d13d" strokeWidth={3} dot={false} activeDot={{ r: 6 }} className="graph-line" />

            <Line yAxisId="left" type="monotone" dataKey="전체 이온 수" stroke="#434343" strokeWidth={5} strokeDasharray="6 6" dot={false} activeDot={{ r: 6 }} />
            {/* 열(온도) 변화 그래프를 겹쳐서 표시 */}
            <Line yAxisId="right" type="monotone" dataKey="온도(°C)" stroke="#fa8c16" strokeWidth={3} dot={{ r: 4, fill: '#fff', strokeWidth: 2 }} activeDot={{ r: 7 }} />
          </LineChart>
        </ResponsiveContainer>

        {/* 질문 및 힌트 영역 (그래프 바로 아래에 배치) */}
        <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f9f0ff', borderRadius: '8px', borderLeft: '5px solid #722ed1', display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <p style={{ margin: 0, fontWeight: 'bold', fontSize: '1.15em', color: '#531dab', lineHeight: '1.4' }}>
              🤔 생각 해보기: <br />위 그래프를 보면 0 ~ 10mL 구간에서 "전체 이온 수"는 왜 계속 20개로 변하지 않을까요?
            </p>
            <button
              onClick={() => setShowHint(!showHint)}
              style={{ padding: '8px 16px', backgroundColor: showHint ? '#fff' : '#722ed1', color: showHint ? '#722ed1' : 'white', border: '1px solid #722ed1', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', whiteSpace: 'nowrap', transition: 'all 0.2s', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
            >
              {showHint ? '힌트 닫기' : '정답 보러가기 👉'}
            </button>
          </div>
          {showHint && (
            <div style={{ padding: '15px', backgroundColor: '#fff', border: '1px dashed #b37feb', borderRadius: '6px', animation: 'fadeIn 0.3s', fontSize: '1.05em', lineHeight: '1.6', color: '#333' }}>
              <strong>💡 정답:</strong> 용액에 들어오는 <strong style={{ color: '#73d13d' }}>OH⁻ 이온 1개</strong>가 기존에 있던 <strong style={{ color: '#ff4d4f' }}>H⁺ 이온 1개</strong>와 만나 물(H₂O)이 되어 사라집니다.
              대신 그 빈자리를 반응하지 않는 구경꾼 이온인 <strong style={{ color: '#1890ff' }}>Na⁺ 이온 1개</strong>가 채우게 되므로,
              결과적으로 이온 1개가 사라지고 1개가 추가되어 <strong>전체 이온 수는 일정하게 유지</strong>됩니다!
            </div>
          )}
        </div>
      </div>

      {/* 데이터 테이블 뷰 버튼 및 컨테이너 */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <button
          onClick={() => setShowTable(!showTable)}
          style={{ padding: '12px 24px', fontSize: '1.1em', fontWeight: 'bold', backgroundColor: showTable ? '#595959' : '#1890ff', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.15)', transition: 'background-color 0.2s' }}
        >
          {showTable ? '📊 테이블 닫기' : '📋 실험 데이터 표 보기 (Excel 뷰)'}
        </button>
      </div>

      {showTable && (
        <div style={{ overflowX: 'auto', backgroundColor: '#fff', padding: '20px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)', animation: 'fadeIn 0.3s', marginBottom: '20px' }}>
          <h3 style={{ marginTop: 0, color: '#1f1f1f' }}>📋 전체 실험 데이터 포맷</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', fontSize: '1.05em' }}>
            <thead>
              <tr style={{ backgroundColor: '#fafafa', borderBottom: '2px solid #ddd' }}>
                <th style={{ padding: '12px', color: '#555' }}>NaOH (mL)</th>
                <th style={{ padding: '12px', color: '#ff4d4f' }}>H⁺</th>
                <th style={{ padding: '12px', color: '#8c8c8c' }}>Cl⁻</th>
                <th style={{ padding: '12px', color: '#1890ff' }}>Na⁺</th>
                <th style={{ padding: '12px', color: '#73d13d' }}>OH⁻</th>
                <th style={{ padding: '12px', color: '#333' }}>전체 이온 수</th>
                <th style={{ padding: '12px', color: '#fa8c16' }}>온도(°C)</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.volume} style={{
                  borderBottom: '1px solid #f0f0f0',
                  backgroundColor: row.volume === 10 ? '#fff9c4' : 'transparent',
                  fontWeight: row.volume === 10 ? 'bold' : 'normal'
                }}>
                  <td style={{ padding: '10px' }}>{row.volume}</td>
                  <td style={{ padding: '10px' }}>{row['H⁺']}</td>
                  <td style={{ padding: '10px' }}>{row['Cl⁻']}</td>
                  <td style={{ padding: '10px' }}>{row['Na⁺']}</td>
                  <td style={{ padding: '10px' }}>{row['OH⁻']}</td>
                  <td style={{ padding: '10px' }}>{row['전체 이온 수']}</td>
                  <td style={{ padding: '10px' }}>{row['온도(°C)'].toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p style={{ textAlign: 'right', fontSize: '0.9em', color: '#888', marginTop: '10px' }}>* 음영 처리된 행은 중화점을 나타냅니다.</p>
        </div>
      )}

      {/* Tailwind 등이 없으므로 전역 애니메이션용 작은 스타일 태그 추가 */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default NeutralizationSim;
