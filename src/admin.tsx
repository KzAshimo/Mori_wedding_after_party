import { useState, useEffect } from "react";

type Side = "groom" | "bride";

type Guest = {
  id: number;
  side: Side;
  name: string;
  paid: boolean;
  attended: boolean; // 来場状態を追加
};

function AdminPanel() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [filter, setFilter] = useState<Side | "all">("all");

  // 初回読み込みでlocalStorageからゲストデータ取得
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("guests") || "[]");
    // attendedがない場合はfalseで初期化
    const normalized: Guest[] = stored.map((g: any) => ({
      ...g,
      attended: g.attended ?? false,
    }));
    setGuests(normalized);
  }, []);

  // 来場状態のトグル
  const toggleAttended = (id: number) => {
    const updated = guests.map((g) =>
      g.id === id ? { ...g, attended: !g.attended } : g
    );
    setGuests(updated);
    localStorage.setItem("guests", JSON.stringify(updated));
  };

  // 料金受取状態のトグル
  const togglePaid = (id: number) => {
    const updated = guests.map((g) =>
      g.id === id ? { ...g, paid: !g.paid } : g
    );
    setGuests(updated);
    localStorage.setItem("guests", JSON.stringify(updated));
  };

  // フィルタ適用
  const filteredGuests =
    filter === "all" ? guests : guests.filter((g) => g.side === filter);

  return (
    <div
      className="container min-vh-100 py-5"
      style={{
        backgroundColor: "#e6f7f8",
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
      }}
    >
      <div
        className="card shadow rounded-4"
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          borderColor: "#81d4d6",
          borderWidth: "2px",
        }}
      >
        <div className="card-body p-5">
          <h1
            className="card-title fw-bold mb-4 text-center"
            style={{ color: "#0abab5", letterSpacing: "0.08em" }}
          >
            ゲスト管理パネル
          </h1>

          {/* フィルタボタン */}
          <div className="d-flex justify-content-center mb-4 gap-3">
            {["all", "groom", "bride"].map((f) => (
              <button
                key={f}
                type="button"
                className={`btn btn-outline-${
                  f === "groom"
                    ? "primary"
                    : f === "bride"
                    ? "info"
                    : "secondary"
                } ${filter === f ? "active" : ""}`}
                onClick={() => setFilter(f as Side | "all")}
                style={{ letterSpacing: "0.04em" }}
              >
                {f === "all" ? "全て" : f === "groom" ? "新郎側" : "新婦側"}
              </button>
            ))}
          </div>

          {/* テーブル */}
          <div className="table-responsive">
            <table className="table table-hover align-middle text-center">
              <thead style={{ backgroundColor: "#c3e8e9" }}>
                <tr style={{ color: "#0a8a90" }}>
                  <th>No.</th>
                  <th>新郎 / 新婦</th>
                  <th>名前</th>
                  <th>来場</th>
                  <th>料金受取</th>
                </tr>
              </thead>
              <tbody>
                {filteredGuests.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-muted fst-italic">
                      該当するゲストがいません
                    </td>
                  </tr>
                ) : (
                  filteredGuests.map(({ id, side, name, paid, attended }, i) => (
                    <tr key={id} style={{ color: "#0a8a90" }}>
                      <td>{i + 1}</td>
                      <td>{side === "groom" ? "新郎側" : "新婦側"}</td>
                      <td>{name}</td>
                      <td>
                        <button
                          className={`btn btn-sm ${
                            attended ? "btn-success" : "btn-outline-secondary"
                          }`}
                          onClick={() => toggleAttended(id)}
                        >
                          {attended ? "来場済み" : "未来場"}
                        </button>
                      </td>
                      <td>
                        <button
                          className={`btn btn-sm ${
                            paid ? "btn-danger" : "btn-outline-warning text-dark"
                          }`}
                          onClick={() => togglePaid(id)}
                        >
                          {paid ? "受取済み" : "未受取"}
                        </button>
                      </td>
                      <td>
                        {/* 他に削除などの操作があればここに */}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
