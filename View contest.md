```dataviewjs

const folder = "tasks";
const dvContainer = dv.container;


// ========================
// Инициализация интерфейса
// ========================
function init() {
    
    // ========================
    // Обычный режим с вводом номера контеста
    // ========================
    dvContainer.innerHTML = `
        <label>Введите номер контеста: 
            <input type="text" id="contestInput" style="min-width:150px;" placeholder="Например, 203126">
            <button id="loadBtn">Показать задачи</button>
        </label>
        <div id="tasksContainer" style="margin-top:10px;"></div>
    `;

    dv.input = dvContainer.querySelector("#contestInput");
    dv.button = dvContainer.querySelector("#loadBtn");
    dv.tasksContainer = dvContainer.querySelector("#tasksContainer");

    dv.button.onclick = async () => {
        const contest = dv.input.value.trim();
        await showTasks(contest);
    };

    dv.input.onkeypress = (e) => {
        if (e.key === "Enter") dv.button.click();
    };

    dv.tasksContainer.innerHTML = "<p>Введите номер контеста и нажмите кнопку или Enter</p>";
}

// ========================
// Запуск init
// ========================
init();

function removeFirstLine(text) {
    if (!text) return "";

    // Проверяем разные типы переносов строк
    const newlineIndex = text.indexOf('\n');
    const crIndex = text.indexOf('\r');
    
    if (newlineIndex !== -1) {
        // Есть обычный перенос строки \n
        return text.substring(newlineIndex + 1);
    } else if (crIndex !== -1) {
        // Есть перенос строки \r (Mac старый стиль)
        
        return text.substring(crIndex + 1);
    } else {
        // Нет переносов строки - возвращаем пустую строку
        return "";
    }
}

async function showTasks(contest) {
    init();

    if (!contest) {
        dv.tasksContainer.innerHTML = "<p>Пожалуйста, введите номер контеста</p>";
        return;
    }
    
    dv.tasksContainer.innerHTML = ""

    const files = dv.pages(`"${folder}"`)
        .filter(p => p.tags && p.tags.some(t => t.toString().trim().includes(`problem/contest/${contest}/`)))
        .sort(p => p.file.name, 'asc');

    if (files.length === 0) {
        dv.tasksContainer.innerHTML = `<p>Задачи для контеста ${contest} не найдены</p>`;
        return;
    }

    for (let f of files) {
        
        try {
            const rawContent = await dv.io.load(f.file.path);
        
           
           // Удаляем frontmatter
let contentWithoutFrontmatter = rawContent.replace(/^---[\s\S]*?---\n?/, "");

contentWithoutFrontmatter = contentWithoutFrontmatter.replace(/^\s+/, "");

// Убираем начальные пробелы
contentWithoutFrontmatter = contentWithoutFrontmatter.replace(/^\s+/, "");



            const contentDiv = document.createElement("div");
            dv.el("div", contentWithoutFrontmatter, contentDiv);
        } catch (error) {
            console.log(error);
        }
    }
}
showTasks(203126)
```




