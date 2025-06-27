import { useState, useEffect } from "react";
import { supabase } from "./lib/supabase";

type Side = "groom" | "bride";

type Guest = {
  id: number;
  side: Side;
  name: string;
  paid: boolean;
  attended: boolean;
  created_at: string;
};

function AdminPanel() {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [filter, setFilter] = useState<Side | "all">("all");
  const [loading, setLoading] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);

  // データ取得
  const fetchGuests = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("guests")
      .select("*")
      .order("created_at", { ascending: true });
    if (error) {
      console.error(error);
      alert("データ取得に失敗しました。");
    } else {
      setGuests(data as Guest[]);
      // 料金合計を計算（paid=true の人数×3000）
      const sum = (data as Guest[]).filter((g) => g.paid).length * 3000;
      setTotalAmount(sum);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchGuests();
  }, []);

  // 来場トグル
  const toggleAttended = async (id: number, current: boolean) => {
    const { error } = await supabase
      .from("guests")
      .update({ attended: !current })
      .eq("id", id);
    if (error) {
      console.error(error);
      alert("来場状態の更新に失敗しました。");
    } else {
      fetchGuests();
    }
  };

  // 料金受取トグル
  const togglePaid = async (id: number, current: boolean) => {
    const { error } = await supabase
      .from("guests")
      .update({ paid: !current })
      .eq("id", id);
    if (error) {
      console.error(error);
      alert("料金受取状態の更新に失敗しました。");
    } else {
      fetchGuests();
    }
  };

  // 削除処理
  const deleteGuest = async (id: number) => {
    if (!window.confirm("本当に削除しますか？")) return;
    const { error } = await supabase.from("guests").delete().eq("id", id);
    if (error) {
      console.error(error);
      alert("削除に失敗しました。");
    } else {
      fetchGuests();
    }
  };

  // フィルタ
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

          {/* フィルタ */}
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

          <div className="mb-3 text-end fw-semibold" style={{ color: "#0a8a90" }}>
            合計会費: ￥{totalAmount.toLocaleString()}
          </div>

          {loading ? (
            <div className="text-center text-muted">読み込み中...</div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle text-center">
                <thead style={{ backgroundColor: "#c3e8e9" }}>
                  <tr style={{ color: "#0a8a90" }}>
                    <th>No.</th>
                    <th>新郎 / 新婦</th>
                    <th>名前</th>
                    <th>来場</th>
                    <th>料金受取</th>
                    <th>操作</th>
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
                    filteredGuests.map((guest, i) => (
                      <tr key={guest.id} style={{ color: "#0a8a90" }}>
                        <td>{i + 1}</td>
                        <td>{guest.side === "groom" ? "新郎側" : "新婦側"}</td>
                        <td>{guest.name}</td>
                        <td>
                          <button
                            className={`btn btn-sm ${
                              guest.attended
                                ? "btn-success"
                                : "btn-outline-secondary"
                            }`}
                            onClick={() =>
                              toggleAttended(guest.id, guest.attended)
                            }
                          >
                            {guest.attended ? "来場済み" : "未来場"}
                          </button>
                        </td>
                        <td>
                          <button
                            className={`btn btn-sm ${
                              guest.paid
                                ? "btn-danger"
                                : "btn-outline-warning text-dark"
                            }`}
                            onClick={() => togglePaid(guest.id, guest.paid)}
                          >
                            {guest.paid ? "受取済み" : "未受取"}
                          </button>
                        </td>
                        <td>
                          <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => deleteGuest(guest.id)}
                          >
                            削除
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
