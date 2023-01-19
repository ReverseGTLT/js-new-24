const DELETE_BTN = '#delete';
const ADD_STUDENT = '#addStudent';
const EDIT_STUDENT = '.input-student'
const INPUT_CLOSEST = 'tr'
const $form = $('#form')
    .on('click', ADD_STUDENT, onAddStudentBtnClick)
const $table = $('#table')
    .on('click', DELETE_BTN, onDeleteStudent)
    .on('focusout', EDIT_STUDENT, onEditStudent)
let list = []

init();
function init() {
    StudentsApi.getList()
        .then(setData)
        .then(renderList)
}
function renderStudent(student) {
    const studentEl = getHtml(student);
    $table[0].insertAdjacentHTML('beforeend' ,studentEl);
}
function renderList(notesList) {
    $table[0].insertAdjacentHTML('beforeend', notesList.map(getHtml));
}
function onEditStudent(e) {
    const $student = e.target.closest(INPUT_CLOSEST);
    const marksArr = getEditedMarksArr($student)
    const studentId = +getStudentItemId($student);
    StudentsApi.editList(studentId, {marks: marksArr})
}
function getEditedMarksArr(el) {
    const marksArr = []
    for (let i = 3; i < 13; i++) {
        marksArr.push(el.childNodes[i].childNodes[0].value)
    }
    return marksArr
}
function getStudentItemId($studentItem) {
    return $studentItem.id
}
function onDeleteStudent(id) {
    const parentId = id.target.closest(INPUT_CLOSEST);
    parentId.remove();
    setData(list.filter(item => item.id !== parentId.id));
    StudentsApi.deleteList(parentId.id);
}
function setData(data) {
    return list = data;
}
function onAddStudentBtnClick(e) {
    const previousElValue = e.target.previousElementSibling.value;
    if (previousElValue || previousElValue !== '') {
        createNote({
            name: previousElValue,
            marks: getDefaultMarks(),
        });
        resetForm()
    }
}
function createNote(note) {
    StudentsApi.createList(note)
        .then((newNote) => {
            list.push(newNote);
            renderStudent(newNote);
        });
}
function getDefaultMarks() {
    return new Array(10).fill(0);
}
function getHtml(student) {
    return `
    <tr id="${student.id}" class="student-item">
        <th>${student.name}</th>
            ${student.marks.map((mark) => `<td><input class="input-student" value=${mark}></td>`)
            .join("")}
        <td><input id="delete" type="button" value="Delete"></td>
    </tr>
    `
}
function resetForm() {
    return $form[0].reset();
}
