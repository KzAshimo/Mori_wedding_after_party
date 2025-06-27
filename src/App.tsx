import { useState } from "react";

function GuestRegister() {
  const [side, setSide] = useState<"bride" | "groom">("groom");
  const [name, setName] = useState("");

  const handleSubmit = () => {
    if (!name.trim()) {
      alert("名前を入力してください");
      return;
    }
    const guest = { id: Date.now(), side, name, paid: false };
    const guests = JSON.parse(localStorage.getItem("guests") || "[]");
    guests.push(guest);
    localStorage.setItem("guests", JSON.stringify(guests));
    alert("登録しました！");
    setName("");
  };

return (
  <div className="container min-vh-100 d-flex justify-content-center align-items-center py-5" style={{ backgroundColor: '#e6f7f8' }}>
    <div
      className="card shadow rounded-4 w-100"
      style={{ maxWidth: "480px", borderColor: '#81d4d6', borderWidth: '2px' }}
    >
      <div className="card-body p-5" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
        <h1 className="card-title text-center mb-4 fw-bold" style={{ color: '#0abab5', letterSpacing: '0.08em' }}>
          二次会ゲスト登録
        </h1>

        <p className="text-center text-muted mb-5 fs-6" style={{ color: '#4c9fa1' }}>
          ゲスト管理のため、<br className="d-none d-md-block" />
          登録のご協力よろしくお願いいたします。
        </p>

        <div className="mb-5 text-center text-secondary small lh-lg" style={{ color: '#6cc0c9' }}>
          <p className="mb-1">
            <span role="img" aria-label="calendar">
              📅
            </span>{" "}
            <strong>日時：</strong>2025/6/28 20:00〜22:00（19:55までにご集合ください）
          </p>
          <p className="mb-1">
            <span role="img" aria-label="location">
              📍
            </span>{" "}
            <strong>場所：</strong>ダイニングバーCHOICE（山形市香住町1-11-14 唐津ビル 2F）
          </p>
          <a
            href="https://maps.app.goo.gl/Cpt5Taz3PsxsYdrdA"
            target="_blank"
            rel="noopener noreferrer"
            className="text-decoration-none fw-semibold"
            style={{ color: '#0abab5' }}
          >
            Googleマップで見る
          </a>
        </div>

        <div className="mb-5 text-center">
          <h3 className="fw-semibold mb-2" style={{ color: '#0a8a90', letterSpacing: '0.05em' }}>
            会費：￥3,000（税込）
          </h3>
          <p className="mb-0 fst-italic" style={{ color: '#7ecedc', fontSize: '0.9rem' }}>
            2時間飲み放題＋3～4品のお料理付き
          </p>
        </div>

        <fieldset className="mb-5">
          <legend
            className="form-label fw-semibold mb-4 text-center fs-5"
            style={{ color: '#0abab5' }}
          >
            新郎側 / 新婦側
          </legend>
          <div className="d-flex justify-content-center gap-4">
            {['groom', 'bride'].map((v) => (
              <div key={v} className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="side"
                  id={v}
                  checked={side === v}
                  onChange={() => setSide(v as 'groom' | 'bride')}
                  style={{ cursor: 'pointer', borderColor: '#0abab5' }}
                />
                <label
                  className="form-check-label fw-semibold"
                  htmlFor={v}
                  style={{ color: '#0abab5', cursor: 'pointer' }}
                >
                  {v === 'groom' ? '新郎側' : '新婦側'}
                </label>
              </div>
            ))}
          </div>
        </fieldset>

        <div className="mb-5">
          <label
            htmlFor="nameInput"
            className="form-label fw-semibold fs-6"
            style={{ color: '#0a8a90' }}
          >
            お名前
          </label>
          <input
            type="text"
            className="form-control form-control-lg rounded-4 shadow-sm"
            id="nameInput"
            placeholder="例：今田 亮平"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              borderColor: '#81d4d6',
              boxShadow: '0 0 8px #81d4d6',
              transition: 'box-shadow 0.3s ease-in-out',
            }}
            onFocus={(e) => {
              e.currentTarget.style.boxShadow = '0 0 12px #0abab5';
              e.currentTarget.style.borderColor = '#0abab5';
            }}
            onBlur={(e) => {
              e.currentTarget.style.boxShadow = '0 0 8px #81d4d6';
              e.currentTarget.style.borderColor = '#81d4d6';
            }}
          />
        </div>

        <button
          className="btn btn-lg w-100 fw-semibold shadow"
          onClick={handleSubmit}
          type="button"
          style={{
            backgroundColor: '#0abab5',
            borderColor: '#0a8a90',
            color: 'white',
            borderRadius: '1.25rem',
            letterSpacing: '0.05em',
            transition: 'background-color 0.3s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0a8a90')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#0abab5')}
        >
          登録する
        </button>
      </div>
    </div>
  </div>
);
}

export default GuestRegister;
