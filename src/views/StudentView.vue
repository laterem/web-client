Here must be NavTree but it needs users
<template>
  <aside id="menu">
    <NavTree :work-tree="workTree" />
  </aside>
  <aside id="content">
    <div v-if="!hasNestedRoutes" id="content">
      <h2>Это базовая страница</h2>
      <h3>Перейдите на нужную работу по ссылке слева</h3>
    </div>
    <div v-else id="content">
      <RouterView />
    </div>
  </aside>
</template>

<script>
import axios from "axios";
import NavTree from "@/components/NavTree.vue";

export default {
  data() {
    return {
      workTree: {},
    };
  },
  computed: {
    hasNestedRoutes() {
      if (this.$router.currentRoute.value.matched.length == 1) {
        return false;
      }
      return true;
    },
  },
  components: {
    NavTree,
  },
  methods: {
    getUser() {
      if (!this.$session.exists) {
        this.$session.start();
      }
      const user_id = this.$session.get("user_id");
      if (typeof user_id != "undefined") {
        return user_id;
      }
      return -1;
    },
    async getWorkTree(user_id = this.user_id) {
      if (user_id == -1) {
        return "Not Logged in";
      }
      const { data: work_tree } = await axios.post(
        "http://0.0.0.0:8179/get_student_worktree",
        {
          id: user_id,
        }
      );
      this.workTree = work_tree;
      return work_tree;
    },
  },
  created() {
    this.getWorkTree(this.getUser());
  },
};
</script>

<style scoped>
aside#menu,
aside#content {
  position: absolute;
  top: 65px;
  bottom: 10px;

  overflow: scroll;
}

aside#menu {
  left: 10px;

  width: calc(20% - 20px);

  padding: 10px;
  border-radius: 20px;

  background: var(--content-background-color);
  box-shadow: 2px 4px 8px var(--content-shadow-color);

  overflow-x: scroll;
}
#menu li {
  margin: 5px 0px 5px 0px;
}
#menu a {
  display: block;

  margin: 5px 0px 0px 0px;

  padding: 2px;
  padding-bottom: 0px;
  margin: 1px;

  font-size: 0.9em;
  text-decoration: none;
  color: var(--body-font-color);
}

#menu a:hover {
  background-color: var(--content-hover-color);
}

#menu .title {
  font-size: large;
}

aside#content {
  left: calc(20% + 20px);

  width: calc(80% - 30px);

  border-radius: 20px;
  box-shadow: 2px 4px 8px var(--content-shadow-color);
  background: var(--content-background-color);
}

div#content {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  padding: 10px;
}

/* Левая часть сайта */
aside#left-side {
  position: absolute;
  top: 0;
  bottom: 0;

  width: 5%;

  border-radius: 20px;
  background: rgba(0, 0, 0, 0);

  overflow: hidden;
}

/* Блок с заданием */
div#work_content {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  padding: 10px;
}

div#work_content {
  left: calc(5% + 5px);
  right: calc(5% + 5px);
  padding-bottom: 35px;
}

/* Правая часть сайта */
aside#right-side {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;

  width: 5%;

  border-radius: 20px;
  background: rgba(0, 0, 0, 0);

  overflow: hidden;
}

#right-side,
#left-side {
  width: 100%;

  background: rgba(0, 0, 0, 0);
  color: var(--body-font-color);
}

/* Нижняя часть сайта */
aside#foot {
  display: grid;
  position: absolute;
  top: calc(100% - 62px);
  bottom: 10px;
  left: calc(20% + 30px);

  width: calc(75% - 40px);

  overflow-y: hidden;
}

#foot div {
  display: flex;
  justify-self: center;

  width: fit-content;
  max-width: calc(100% - 20px);

  padding: 5px;

  background-color: var(--foot-background-color);
  border: 1px solid var(--foot-border-color);
  border-radius: 40px;
  box-shadow: 2px 4px 8px var(--foot-shadow-color);

  white-space: nowrap;
  overflow-x: scroll;
  overflow-y: hidden;
}

#foot {
  display: inline-block;
}

button#right-side,
button#left-side {
  height: 100%;

  background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8' standalone='no'%3F%3E%3C!-- Created with Inkscape (http://www.inkscape.org/) --%3E%3Csvg width='30' height='90' viewBox='0 0 7.9374999 23.8125' version='1.1' id='svg5' inkscape:version='1.2.1 (9c6d41e410, 2022-07-14)' sodipodi:docname='рисунок.svg' xmlns:inkscape='http://www.inkscape.org/namespaces/inkscape' xmlns:sodipodi='http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd' xmlns='http://www.w3.org/2000/svg' xmlns:svg='http://www.w3.org/2000/svg'%3E%3Csodipodi:namedview id='namedview7' pagecolor='%23505050' bordercolor='%23eeeeee' borderopacity='1' inkscape:showpageshadow='0' inkscape:pageopacity='0' inkscape:pagecheckerboard='true' inkscape:deskcolor='%23505050' inkscape:document-units='mm' showgrid='false' inkscape:zoom='4.4195761' inkscape:cx='24.097334' inkscape:cy='68.106079' inkscape:window-width='1920' inkscape:window-height='1057' inkscape:window-x='-8' inkscape:window-y='-8' inkscape:window-maximized='1' inkscape:current-layer='layer1' /%3E%3Cdefs id='defs2'%3E%3Cinkscape:path-effect effect='fillet_chamfer' id='path-effect844' is_visible='true' lpeversion='1' nodesatellites_param='F,0,0,1,0,1.5875,0,1 @ F,0,0,1,0,1.5875,0,1 @ F,0,0,1,0,1.5875,0,1' unit='px' method='auto' mode='F' radius='6' chamfer_steps='1' flexible='false' use_knot_distance='true' apply_no_radius='true' apply_with_radius='true' only_selected='false' hide_knots='false' /%3E%3C/defs%3E%3Cg inkscape:label='Слой 1' inkscape:groupmode='layer' id='layer1'%3E%3Cpath sodipodi:type='star' style='fill:%23dadada;stroke:none;stroke-width:0.266999' id='path234' inkscape:flatsided='true' sodipodi:sides='3' sodipodi:cx='1.0177258' sodipodi:cy='11.90625' sodipodi:r1='13.26136' sodipodi:r2='6.6306801' sodipodi:arg1='0' sodipodi:arg2='1.0471976' inkscape:rounded='0' inkscape:randomized='0' d='m 12.904271,12.7 -17.1424099,9.897175 a 0.91654355,0.91654355 30 0 1 -1.3748154,-0.79375 l 0,-19.7943498 a 0.91654355,0.91654355 150 0 1 1.3748154,-0.79375 L 12.904271,11.1125 a 0.91654355,0.91654355 90 0 1 0,1.5875 z' inkscape:transform-center-x='-1.3229166' transform='matrix(0.39902895,0,0,1.0367076,2.2397312,-0.43705023)' inkscape:path-effect='%23path-effect844' /%3E%3C/g%3E%3C/svg%3E%0A");
  background-repeat: no-repeat;
  background-position: 50%;
}

button#left-side {
  transform: rotate(180deg);
}

table.progress_line {
  width: 100%;
  border: 0px;
  margin-bottom: 3px;
}

td.no-answer {
  background-color: var(--no-answer-background-color);
}

td.correct {
  background-color: var(--correct-color);
}

td.partial {
  background-color: var(--unchecked-color);
}

td.wrong {
  background-color: var(--wrong-color);
}

#truth-table {
  display: inline-grid;
  border-radius: 10px;
  border-width: 1px;
  border-color: var(--dark-font-color);
  overflow: hidden;
  grid-template-columns: repeat(5, max-content);
  grid-template-rows: 2em repeat(4, auto);
  justify-items: center;
  align-items: center;
}

#truth-table * {
  display: flex;
  justify-content: center;
  align-content: center;
}

#truth-table div:not(:empty) {
  padding: 5px;
  width: 1.5em;
  height: 1.2em;
}

#truth-table div:nth-of-type(10n + 1),
#truth-table div:nth-of-type(10n + 2),
#truth-table div:nth-of-type(10n + 3),
#truth-table div:nth-of-type(10n + 4),
#truth-table div:nth-of-type(10n + 5) {
  background-color: var(--content-hover-color);
}

connection {
  height: 0;
  display: block;
  position: fixed;
  top: 0;
  left: 0;
}

connection .line .arrow {
  top: -5px;
  height: 0px;
  width: 0px;
  position: absolute;
  border-bottom: 6px solid transparent;
  border-top: 6px solid transparent;
  background-clip: border-box;
}
connection .line .arrow-fw {
  border-right: 12px solid black;
}

connection .line .arrow-bw {
  left: 100%;
  border-left: 12px solid black;
  transform: translateX(-12px);
}

connection .line .text {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translate(-50%, -100%);
}

connection .line {
  position: absolute;
  height: 2px;

  background-color: black;
}
</style>
