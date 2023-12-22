document.addEventListener("DOMContentLoaded", function() {
    // 変数宣言
    var clockInButton = document.getElementById('clockInButton');
    var clockOutButton = document.getElementById('clockOutButton');
    var loginButton = document.getElementById('loginButton');
    var loginPage = document.getElementById('loginPage');
    var attendancePage = document.getElementById('attendancePage');

    // ログイン機能
    loginButton.addEventListener('click', function() {
        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;
        if (username === 'admin' && password === 'password') { // 仮の認証
            loginPage.style.display = 'none';
            attendancePage.style.display = 'block';
            clockInButton.disabled = false;
        } else {
            alert('Invalid credentials');
        }
    });

    // 出勤ボタンと退勤ボタン
    clockOutButton.disabled = true; // 初期状態では退勤ボタンを無効化
    clockInButton.addEventListener('click', function() {
        var now = new Date();
        var record = '出勤: ' + formatTime(now);
        addAttendanceRecord(record);
        clockInButton.disabled = true;  // 出勤ボタンを無効化
        clockOutButton.disabled = false; // 退勤ボタンを有効化
        // カレンダーへの時間記録
        var day = now.getDate();
        var inCell = document.getElementById(`in-${day}`);
        inCell.innerHTML = formatTime(now);
    });

    clockOutButton.addEventListener('click', function() {
        var now = new Date();
        var record = '退勤: ' + formatTime(now);
        addAttendanceRecord(record);
        clockInButton.disabled = true;  // 出勤ボタンを無効化
        clockOutButton.disabled = true; // 退勤ボタンも無効化
        // カレンダーへの時間記録
        var day = now.getDate();
        var outCell = document.getElementById(`out-${day}`);
        outCell.innerHTML = formatTime(now);
    });

    // 現在の日付を表示
    var today = new Date();
    document.getElementById('currentDate').textContent = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

    // カレンダーの生成
    generateCalendar();
});

// 時間フォーマット関数
function formatTime(date) {
    return date.getHours() + ':' + ('0' + date.getMinutes()).slice(-2);
}

// 出勤・退勤の記録を履歴に追加する関数
function addAttendanceRecord(record) {
    var node = document.createElement("li");
    var textnode = document.createTextNode(record);
    node.appendChild(textnode);
    document.getElementById('historyList').appendChild(node);
}

// カレンダーの生成関数
function generateCalendar() {
    var tableBody = document.getElementById('calendarTable').getElementsByTagName('tbody')[0];
    var currentDate = new Date();
    var year = currentDate.getFullYear();
    var month = currentDate.getMonth();
    var firstDay = new Date(year, month, 1).getDay();
    var daysInMonth = new Date(year, month + 1, 0).getDate();

    var date = 1;
    for (var i = 0; i < 6; i++) { // 最大6週
        var row = tableBody.insertRow();
        for (var j = 0; j < 7; j++) { // 週の各日
            if (i === 0 && j < firstDay) {
                row.insertCell(); // 月の最初の週で最初の日まで空白
            } else if (date > daysInMonth) {
                break; // 月の日数を超えたら終了
            } else {
                var cell = row.insertCell();
                cell.innerHTML = `${date}<br><small id='in-${date}'></small><br><small id='out-${date}'></small>`;
                date++;
            }
        }
    }
}
