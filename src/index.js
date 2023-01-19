const DELETE_BTN = '#delete';
const STUDENT_INPUT = '.input-student'
const INPUT_CLOSEST = 'tr'

const $form = $('#form')
    .on('submit', onAddStudentBtnClick)

const $table = $('#table')
    .on('click', DELETE_BTN, onDeleteStudent)
    .on('focusout', STUDENT_INPUT, onEditStudent)

let studentList = []

init();
function init() {
    StudentsApi.getList()
        .then(setData)
        .then(renderList)
}
function renderStudent(student) {
    const studentEl = getHtmlOneStudent(student);
    $table[0].insertAdjacentHTML('beforeend' ,studentEl);
}
function renderList(studentList) {
    $table[0].insertAdjacentHTML('beforeend', studentList
        .map(getHtmlOneStudent).join(''));
}
function onEditStudent(e) {
    const $student = getStudentInput(e);
    const marksArr = getEditedMarksArr($student)
    const studentId = +getStudentItemId($student);
    StudentsApi.editList(studentId, {marks: marksArr})
}
function getEditedMarksArr(el) {
    return  Array.from(el.querySelectorAll(STUDENT_INPUT))
        .map(input => Number(input.value))
}
function getStudentInput(student) {
    return student.target.closest(INPUT_CLOSEST);
}
function getStudentItemId(studentItem) {
    return studentItem.id
}
function onDeleteStudent(id) {
    const parentId = getStudentInput(id)
    setData(studentList.filter(student => student.id !== parentId.id));
    StudentsApi.deleteList(parentId.id)
        .then(()=> parentId.remove())
}
function setData(data) {
    return studentList = data;
}
function onAddStudentBtnClick(e) {
    e.preventDefault();
    const previousElValue = getPreviousElValue(e);
    if (previousElValue !== '') {
        createStudent({
            name: previousElValue,
            marks: getDefaultMarks(),
        });
        resetForm()
    }
}
function getPreviousElValue(e) {
    return e.target.childNodes[1].value
}
function createStudent(data) {
    StudentsApi.createList(data)
        .then((newData) => {
            studentList.push(newData);
            renderStudent(newData);
        });
}
function getDefaultMarks() {
    return new Array(10).fill(0);
}
function getHtmlOneStudent(student) {
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
