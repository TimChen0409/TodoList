var datenow = new Date()
var day_list = ['日', '一', '二', '三', '四', '五', '六'];
var today = `${datenow.getFullYear()}.${datenow.getMonth() + 1}.${datenow.getDate()}(${day_list[datenow.getDay()]})`
var clock = `${datenow.getHours()}:${datenow.getMinutes()}:${datenow.getSeconds()}`

var vm = new Vue({

    el: '#app',
    data: {
        time: today,
        newtask: '', //輸入框內容
        tasks: [{
            id: 1,
            name: '買麥當勞薯條+肯德基蛋塔',
            date: datenow.toLocaleString(),
            finished: false
        }],
        type: 'all',
        date: clock
    },
    mounted() {
        var _this = this; //聲明一個變量指向 Vue 實例 this, 保證作用域一致, _this代表最初的對象
        this.timer = setInterval(function () {
            var today = new Date();
            var hh = today.getHours();
            var mm = today.getMinutes();
            var ss = today.getSeconds();
            hh = checkTime(hh);
            mm = checkTime(mm);
            ss = checkTime(ss);
            _this.date = hh + ':' + mm + ':' + ss;

        }, 1000);
    },
    methods: {
        addTask: function () { //新增一筆待辦事項
            var value = this.newtask.trim();
            var addtime = new Date();
            var id = Math.floor(addtime);
            if (!value) return
            this.tasks.push({
                id: id,
                name: value,
                date: addtime.toLocaleString(),
                finished: false
            })
            this.newtask = ''
        },
        removeTask: function (task) {//從tasks抓出和task.id一樣的item.id的位置，並進行刪除
            var newIndex = '';
            var _this = this;
            _this.tasks.forEach(function (item, index) {
                if (task.id === item.id) {
                    newIndex = index
                }
            })
            this.tasks.splice(newIndex, 1);
        },
        clearAll: function () {
            var cf = confirm('是否清除所有代辦事項?')
            if (cf) {
                this.tasks = [];
            }
        }

    },
    computed: {
        filter: function () {
            var filterTasks = [];
            switch (this.type) { //要判斷的事項類型
                case 'ing': //條件
                    filterTasks = this.tasks.filter(function (item) {
                        return item.finished == false
                    })
                    return filterTasks
                case 'done':
                    filterTasks = this.tasks.filter(function (item) {
                        return item.finished == true
                    })
                    return filterTasks
                case 'all':
                    return this.tasks;
            }
        },
        getDoneTask: function () {//取得完成事項數字
            var done = [];
            done = this.tasks.filter(task => task.finished == true);
            return done.length
        },
        getInprogressTask: function () {//取得進行中事項數字
            var remain = []
            remain = this.tasks.filter(task => task.finished == false);
            return remain.length
        },
        progressrate: function () {
            if (this.tasks.length == 0) {
                return 0
            }
            return Math.floor(this.getDoneTask / this.tasks.length * 100);
        }
    }

});

function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}




