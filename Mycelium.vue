import Vue from 'vue';
import Router from 'vue-router';
import {
	getBasename
} from '@ice/stark-app';

import {
	renderNotFound
} from '@ice/stark-app';


const Home = () => import( /* webpackChunkName: "home" */ '@/pages/home/index.vue')

//直播模块
const Live = () => import( /* webpackChunkName: "live" */ '@/pages/live/index.vue')
const LiveDetail = () => import( /* webpackChunkName: "liveDetail" */ '@/pages/live/detail.vue')
//文章模块
const Article = () => import( /* webpackChunkName: "article" */ '@/pages/article/index.vue')
const ArticleDetail = () => import( /* webpackChunkName: "articleDetail"*/ '@/pages/article/detail.vue')


//活动模块
const Activity = () => import( /* webpackChunkName: "activity" */ '@/pages/activity/index.vue')
const ActivityDetail = () => import( /* webpackChunkName: "activityDetail" */ '@/pages/activity/detail.vue')
//课程模块
const Course = () => import( /* webpackChunkName: "course" */ '@/pages/course/index.vue')
const CourseDetail = () => import( /* webpackChunkName: "courseDetail" */ '@/pages/course/detail.vue')
const CourseChapter = () => import( /* webpackChunkName: "courseChapter" */ '@/pages/course/chapter.vue')

//专家模块
const Expert = () => import( /* webpackChunkName: "expert" */ '@/pages/expert/index.vue')
const ExpertDetail = () => import( /* webpackChunkName: "expertDetail" */ '@/pages/expert/detail.vue')

//求助模块
const Help = () => import( /* webpackChunkName: "help" */ '@/pages/help/index.vue')
const HelpDetail = () => import( /* webpackChunkName: "helpDetail" */ '@/pages/help/detail.vue')

//我的模块
const MyArticles = () => import( /* webpackChunkName: "myArticles" */ '@/pages/my/articles.vue')
const MyCourses = () => import( /* webpackChunkName: "myCourses" */ '@/pages/my/courses.vue')
const MyExperts = () => import( /* webpackChunkName: "myExperts" */ '@/pages/my/experts.vue')

//消息模块
const MyMsgs = () => import( /* webpackChunkName: "myMsgs" */ '@/pages/my/msgs.vue')

//专家端
const ExpertStudio = () => import( /* webpackChunkName: "expertStudio" */ '@/pages/expertStudio/index.vue')
const ExpertStudioHome = () => import( /* webpackChunkName: "expertStudioHome" */ '@/pages/expertStudio/home.vue')
const ExpertStudioLive = () => import( /* webpackChunkName: "expertStudioLive" */ '@/pages/expertStudio/live/index.vue')
const ExpertStudioCourse = () => import( /* webpackChunkName: "expertStudioCourse" */
	'@/pages/expertStudio/course/index.vue')
const ExpertStudioArticle = () => import( /* webpackChunkName: "expertStudioArticle" */
	'@/pages/expertStudio/article/index.vue')

Vue.use(Router);

const routes = [{
		path: '/',
		component: Home
	},
	{
		path: '/live',
		component: Live,
	},
	{
		path: '/liveDetail',
		component: LiveDetail,
	},
	{
		path: '/article',
		component: Article,
	},
	{
		path: '/articleDetail',
		component: ArticleDetail,
	},
	{
		path: '/activity',
		component: Activity,
	},
	{
		path: '/activityDetail',
		component: ActivityDetail,
	},
	{
		path: '/course',
		component: Course,
	},
	{
		path: '/courseDetail',
		component: CourseDetail,
	},
	{
		path: '/courseChapter',
		component: CourseChapter,
	},
	{
		path: '/expert',
		component: Expert,
	},
	{
		path: '/expertDetail',
		component: ExpertDetail
	},
	{
		path: '/help',
		component: Help,
	},
	{
		path: '/helpDetail',
		component: HelpDetail,
	},
	{
		path: '/myArticles',
		component: MyArticles
	},
	{
		path: '/myCourses',
		component: MyCourses
	},
	{
		path: '/myExperts',
		component: MyExperts
	},
	{
		path: '/myMsgs',
		component: MyMsgs
	},

	{
		path: '/expertStudio',
		component: ExpertStudio,
		children: [{
				path: '/',
				component: ExpertStudioHome
			},
			{
				path: 'live',
				component: ExpertStudioLive
			},
			{
				path: 'course',
				component: ExpertStudioCourse
			},
			{
				path: 'article',
				component: ExpertStudioArticle
			}
		]
	},
	{
		path: '*',
		component: () => renderNotFound(),
	},
];



const router = new Router({
	routes,
	mode: 'history',
	base: getBasename(),
})

// router.beforeEach((to, from, next) => {
// 	console.log(to)
// 	next()
// })

export default router
