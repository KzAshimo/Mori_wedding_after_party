import { useState } from 'react';

function GuestRegister() {
  const [side, setSide] = useState<'bride' | 'groom'>('groom');
  const [name, setName] = useState('');

  const handleSubmit = () => {
    if (!name.trim()) {
      alert('名前を入力してください');
      return;
    }
    const guest = { id: Date.now(), side, name, paid: false };
    const guests = JSON.parse(localStorage.getItem('guests') || '[]');
    guests.push(guest);
    localStorage.setItem('guests', JSON.stringify(guests));
    alert('登録しました！');
    setName('');
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center">
      <div className="card w-full max-w-sm shadow-lg bg-base-100">
        <div className="card-body">
          <h2 className="card-title justify-center">ゲスト登録</h2>

          <button className="btn btn-primary">ボタン</button> 

          <div className="form-control">
            <label className="label">新郎側 / 新婦側</label>
            <div className="flex gap-4">
              <label className="cursor-pointer label">
                <input
                  type="radio"
                  name="side"
                  value="groom"
                  className="radio checked:bg-primary"
                  checked={side === 'groom'}
                  onChange={() => setSide('groom')}
                />
                <span className="label-text ml-2">新郎側</span>
              </label>
              <label className="cursor-pointer label">
                <input
                  type="radio"
                  name="side"
                  value="bride"
                  className="radio checked:bg-secondary"
                  checked={side === 'bride'}
                  onChange={() => setSide('bride')}
                />
                <span className="label-text ml-2">新婦側</span>
              </label>
            </div>
          </div>

          <div className="form-control mt-4">
            <label className="label">
              <span className="label-text">お名前</span>
            </label>
            <input
              type="text"
              placeholder="例：山田 太郎"
              className="input input-bordered"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="card-actions justify-center mt-4">
            <button className="btn btn-primary w-full" onClick={handleSubmit}>
              登録
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GuestRegister;
