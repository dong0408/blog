module.exports = {
  // 选择语言
  locales: {
    '/': {
      lang: 'zh-CN'
    }
  },
  head: [
    // 博客前的头像
    ['link', { rel: 'icon', href: '/headPortrait.jpg' }]
  ],
  base: '/my-blog/',
  title: '潘小七的博客',
  description: '举杯邀明月，对影成三人~',
  theme: 'reco',
  dest: "./docs/.vuepress/dist",
  themeConfig: {
    logo: '/headPortrait.jpg',
    blogConfig: {
      category: {
        location: 2,
        text: "目录"
      },
      tag: {
        location: 3,
        text: "标签"
      },
      socialLinks: [     // 信息栏展示社交信息
        { link: 'https://gitee.com/xiaopanpanya', icon: 'reco-mayun' },
        { link: 'https://github.com/xiaopanopan', icon: 'reco-github' },
        {
          text: "稀土掘金",
          link: "https://juejin.cn/user/4262162784847127/posts",
          icon: "reco-juejin"
        },
        {
          text: "Leetcode",
          link: "https://leetcode.cn/u/silly-heyrovskys1p/",
          icon: "reco-coding"
        },
      ]
    },
    mode: 'dark', // 默认 auto，auto 跟随系统，dark 暗色模式，light 亮色模式
    authorAvatar: 'headPortrait.jpg',
    type: 'blog',
    subSidebar: 'auto',
    lastUpdated: '上次更新',
    nav: [
      { text: '首页', link: '/', icon: 'reco-home' },
      { text: '时间线', link: '/timeline/', icon: 'reco-date' },
      {
				text: "简历",
				icon: "reco-message",
				items: [{
					text: "我的简历",
					link: "/views/Resume/resume"
				}]
			},
      {
        text: '友情链接',
        icon: "reco-message",
        items: [
          { text: 'Gitee', link: 'https://gitee.com/bestcuicheng', icon: 'reco-mayun' },
          { text: 'Github', link: 'https://github.com/CuiChengweb', icon: 'reco-github' },
          {
						text: "稀土掘金",
						link: "https://juejin.cn/user/4262162784847127/posts",
						icon: "reco-juejin"
					},
          {
						text: "Leetcode",
						link: "https://leetcode.cn/u/silly-heyrovskys1p/",
						icon: "reco-coding"
					},
        ]
      }
    ],
    sidebar: "auto",
    friendLink: [
      {
        title: 'vuepress-theme-reco',
        desc: 'A simple and beautiful vuepress Blog & Doc theme.',
        logo: "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
        link: 'https://vuepress-theme-reco.recoluan.com'
      },
      {
        title: '午后南杂',
        desc: 'Enjoy when you can, and endure when you must.',
        email: 'recoluan@qq.com',
        link: 'https://www.recoluan.com'
      },
      // ...
    ],
    markdown: {
      lineNumbers: true
    },
    // 发表评论
    valineConfig: {
      appId: 'OcpE2k26zVB0L3vtcpYl0uPK-gzGzoHsz', // your appId
			appKey: 'rp6d1uq9qMATS2zJnuviZ3ZS', // your appKey
			showComment: false,
			placeholder: '发表评论~',
			visitor: true,
			avatarForce: true,
			avatar: 'monsterid'
    }
  },
  plugins: [
    [
      '@vuepress-reco/vuepress-plugin-kan-ban-niang',
      {
        theme: [ 'wanko','whiteCat', 'blackCat', 'haru1', 'haru2', 'haruto', 'koharu', 'izumi', 'shizuku', 'miku', 'z16'],
        messages: {
          welcome: '欢迎来到小七的博客',
           home: '心里的花，我想要带你回家。', 
           theme: '好吧，希望你能喜欢我的其他小伙伴。', 
           close: '你知道我喜欢吃什么吗？痴痴地望着你。'
        },
        width: 200,
        height: 270
      }
    ],
    // 设置评论功能
		[
			"@vuepress-reco/vuepress-plugin-comments",
			{
				theme: ["miku"],
				clean: true,
				modelStyle: {
					position: "fixed",
					left: "0px",
					bottom: "0px",
					opacity: "0.9",
					zIndex: 99999
				}
			}
		],
    ['@vuepress/back-to-top'],
    ["vuepress-plugin-nuggets-style-copy", {
      copyText: "复制代码",
      tip: {
        content: "复制成功"
      }
    }],
    [
      '@vssue/vuepress-plugin-vssue', {
        platform: 'github',
        owner: 'CuiChengweb',
        repo: 'vuepressCommon',
        clientId: '7a825c464c53a6407f75',
        clientSecret: 'ce643ea984fda091c8b0b7c0893a609461969678',
        locale: 'zh',
        autoCreateIssue: true,//自动创建评论
      },
    ],
    // 点击爆炸效果
    [
      "vuepress-plugin-cursor-effects",
			{
				size: 2, // size of the particle, default: 2
				shape: 'circle', // shape of the particle, default: 'star'
				zIndex: 999999999 // z-index property of the canvas, default: 999999999
			}
    ],
    ["ribbon-animation", {
      size: 90,   // 默认数据
      opacity: 0.3,  //  透明度
      zIndex: -1,   //  层级
      opt: {
        // 色带HSL饱和度
        colorSaturation: "80%",
        // 色带HSL亮度量
        colorBrightness: "60%",
        // 带状颜色不透明度
        colorAlpha: 0.65,
        // 在HSL颜色空间中循环显示颜色的速度有多快
        colorCycleSpeed: 6,
        // 从哪一侧开始Y轴 (top|min, middle|center, bottom|max, random)
        verticalPosition: "center",
        // 到达屏幕另一侧的速度有多快
        horizontalSpeed: 200,
        // 在任何给定时间，屏幕上会保留多少条带
        ribbonCount: 2,
        // 添加笔划以及色带填充颜色
        strokeSize: 0,
        // 通过页面滚动上的因子垂直移动色带
        parallaxAmount: -0.5,
        // 随着时间的推移，为每个功能区添加动画效果
        animateSections: true
      },
      ribbonShow: false, //  点击彩带  true显示  false为不显示
      ribbonAnimationShow: true  // 滑动彩带
    }],
    [
      'dynamic-title',
      {
        showText: '(/≧▽≦/)欢迎回来！',
        hideText: '(●—●)博客在这！',
        recoverTime: 2000,
      },
    ],
    [
      '@vuepress-reco/vuepress-plugin-bgm-player',
      {
        autoShrink: true,
        autoplay: true,
        audios: [
          {
            name: '有何不可',
            artist: '许嵩',
            url: 'http://music.163.com/song/media/outer/url?id=167876.mp3',
            songPic: 'http://p1.music.126.net/KyBR4ZDYFlzQJE_uyvfjpA==/109951166118671647.jpg?param=130y130'
          },
          {
            name: '悔过',
            artist: '王贰浪',
            url: 'http://music.163.com/song/media/outer/url?id=1809760190.mp3',
            songPic: 'http://p2.music.126.net/o4FJ43VDbkAwGUtbhtEB1Q==/109951165609167257.jpg?param=130y130'
          },
         
        ]
      }
    ]
  ]
}