<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
import { useLoginStore } from "./store/login";
import { playListStore } from "./store/playlist";

const useLogin = useLoginStore();
const playlist = playListStore()
onLaunch(async () => {
  console.log("NCX Music App Launch");
  await useLogin.checkLoginStatus()
  await playlist.getTest()
});
onShow(() => {
  console.log("NCX Music App Show");
});
onHide(() => {
  console.log("NCX Music App Hide");
});
</script>

<style lang="scss">
// 全局选中颜色
$select: #093FB4;
</style>
