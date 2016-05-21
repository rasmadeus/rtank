function error(req, res) {
    res.render('article', {
        title: 'cтраница не найдена',
        article: {
            header: 'Такой страницы не существует',
            content: 'Возможно страница была перемещена или удалена. Проверьте правильность введённого url адреса. Если ничего не помогает, попробуйте начать поиск на главной странице.'
        }
    });
}

function index(req, res) {
    res.render('article', {
        title: 'RTank - главаная страница',
        article: {
            header: 'Проект RTank',
            content: 'Проект находится в разработке. Пока здесь пусто. P.S. Прошу не воспринимать как пшёл вон тсюда!'
        }
    });
}

module.exports = {
    error: error,
    index: index
};

