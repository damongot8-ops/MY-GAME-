let score = 0;
let num1 = 0;
let num2 = 0;
let correctAnswer = 0;

// ดึงองค์ประกอบจาก HTML
const num1El = document.getElementById('num1');
const num2El = document.getElementById('num2');
const inputEl = document.getElementById('answer-input');
const submitBtn = document.getElementById('submit-btn');
const resultEl = document.getElementById('result-message');
const scoreEl = document.getElementById('score');
const loadingEl = document.getElementById('loading-message'); // เพิ่มตัวนี้

// ฟังก์ชันสุ่มโจทย์
function generateProblem() {
    // 1. ซ่อนข้อความโหลด และแสดงโจทย์
    loadingEl.style.display = 'none'; // ซ่อนข้อความ 'กำลังโหลด...'
    
    // 2. สุ่มตัวเลข
    // สุ่มเลข 1-10 สำหรับโจทย์ง่ายๆ (ปรับค่า 10 เป็น 50 ถ้าอยากได้ยากขึ้น)
    num1 = Math.floor(Math.random() * 10) + 1; 
    num2 = Math.floor(Math.random() * 10) + 1;
    correctAnswer = num1 + num2;
    
    // 3. แสดงโจทย์บนหน้าเว็บ
    num1El.textContent = num1;
    num2El.textContent = num2;
    
    inputEl.value = ''; // เคลียร์ช่องคำตอบเก่า
    inputEl.focus(); // ให้เคอร์เซอร์กระพริบพร้อมให้ใส่คำตอบเลย
    resultEl.textContent = ''; // เคลียร์ข้อความผลลัพธ์
}

// ฟังก์ชันตรวจสอบคำตอบ
function checkAnswer() {
    // ตรวจสอบว่าช่องคำตอบเป็นตัวเลขจริง
    const userAnswer = parseInt(inputEl.value); 
    
    if (isNaN(userAnswer)) {
        resultEl.textContent = "กรุณาใส่ตัวเลขเท่านั้น!";
        return;
    }

    if (userAnswer === correctAnswer) {
        resultEl.textContent = "✅ ถูกต้อง! เก่งมาก!";
        score++;
    } else {
        resultEl.textContent = `❌ ผิด! คำตอบที่ถูกต้องคือ ${correctAnswer}`;
        score = Math.max(0, score - 1); // หักคะแนนอย่างน้อย 1 หรือให้เป็น 0
    }
    
    scoreEl.textContent = `คะแนน: ${score}`;
    
    // หน่วงเวลาเล็กน้อย (1.5 วินาที) ก่อนเรียกโจทย์ใหม่
    setTimeout(generateProblem, 1500); 
}

// --- การเรียกใช้งาน (Event Listeners) ---

// 1. เชื่อมปุ่ม 'ตรวจคำตอบ'
submitBtn.addEventListener('click', checkAnswer);

// 2. เชื่อมการกด Enter ในช่องคำตอบ
inputEl.addEventListener('keyup', (event) => {
    // เช็คว่าถ้าเป็นปุ่ม Enter ให้เรียก checkAnswer()
    if (event.key === 'Enter') {
        checkAnswer();
    }
});

// 3. เริ่มเกมครั้งแรก (จะถูกเรียกทันทีเมื่อเว็บโหลด)
generateProblem();

