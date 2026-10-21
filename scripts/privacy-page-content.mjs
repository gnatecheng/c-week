/** HTML bodies for /privacy/ and /en/privacy/ (generated pages). */

export const privacyBodyZh = `
<p class="privacy-lead"><strong>一句话说明：</strong>这三个应用都是<strong>离线、无账号、无服务器</strong>的工具。默认不收集、不上传你的个人信息。数据只存在你手机本机；只有你主动导出、分享或备份时，文件才会离开手机。</p>
<p><strong>生效日期：</strong>2026-10-13 · <strong>发布者：</strong>Ch Etang（Etai 应用集）</p>
<h3>我们是谁</h3>
<p>Etai 应用集是个人开发者发布的开源 Android 应用集合。官网：<a href="https://etais.dev/">https://etais.dev/</a>。开源代码见 GitHub 上的 C一周通、轻记账、团团记仓库。</p>
<h3>我们处理哪些数据</h3>
<h4>1. 应用内业务数据（只存本机）</h4>
<ul>
  <li><strong>C一周通：</strong>学习进度、错题本、界面语言与主题等偏好</li>
  <li><strong>轻记账：</strong>账本流水、分类、备注、收据图片（若你添加）、界面偏好</li>
  <li><strong>团团记：</strong>团体与成员、事务进度、团费流水、缴费凭证图片（若你添加）、界面偏好</li>
</ul>
<p>这些数据保存在应用的本机存储中，<strong>不会</strong>同步到我们运营的云端（我们没有这类服务器）。</p>
<h4>2. 你主动导出或分享的内容</h4>
<p>当你使用「备份 / 导出 / 复制文案 / 分享」等功能时，会生成 zip、CSV、文本或图片等文件。这些文件只在你选择的保存位置或分享目标中出现。我们不会代你上传。</p>
<h4>3. 我们不收集的内容</h4>
<ul>
  <li>不要求注册或登录</li>
  <li>不收集姓名、手机号、邮箱、身份证等身份信息</li>
  <li>不接入广告 SDK、统计分析 SDK、崩溃上报 SDK（以各版本 AndroidManifest 与依赖为准）</li>
  <li>各应用<strong>主清单均未声明 INTERNET 权限</strong>；合并后的安装清单可能包含依赖库带入的 ACCESS_NETWORK_STATE 等（见下方权限说明）。日常使用不需要联网，我们也没有自建后端接收你的业务数据</li>
</ul>
<h3>权限说明</h3>
<p>各应用只申请实现功能所必需的权限。以下根据各应用<strong>主清单与常见合并结果</strong>整理；<strong>以你安装时系统展示的列表为准</strong>：</p>
<ul>
  <li><strong>C一周通：</strong>主清单无 INTERNET。合并清单可能包含 Media3 依赖带入的 <code>ACCESS_NETWORK_STATE</code>（检测网络状态，不上传学习数据）。课文与演示视频均打包在 APK 内。</li>
  <li><strong>轻记账：</strong>主清单<strong>未声明 INTERNET 与 CAMERA 权限</strong>。仅声明可选硬件特性 <code>android.hardware.camera</code>（<code>required=false</code>）。添加收据照片时由你主动打开<strong>系统相机或图片选择器</strong>，不会在后台扫描相册。合并后的安装清单可能包含通知、读取媒体/存储、桌面小组件等（备份、分享与小组件），以安装界面为准。</li>
  <li><strong>团团记：</strong>主清单<strong>未声明任何 uses-permission</strong>（无 INTERNET、无相机权限等）。小组件、备份与分享通过系统标准机制与 FileProvider 完成。合并后的安装清单以你设备上的安装界面为准。</li>
</ul>
<p>我们不会申请与功能无关的敏感权限。具体列表以安装时系统展示及各仓库源码中的清单为准。</p>
<h3>儿童与未成年人</h3>
<p>本应用不面向儿童定向收集信息。因数据默认仅存本机且无账号体系，监护人可直接在设备上管理或卸载应用。</p>
<h3>数据安全与换机</h3>
<ul>
  <li>本机数据的安全主要取决于你的设备锁屏与系统安全设置</li>
  <li>卸载应用通常会删除应用内数据；换机或重装前请先使用应用内备份（如有）</li>
  <li>正式签名版本与测试版 / 旧签名版可能无法互相覆盖安装；强制卸载会丢数据，请先备份</li>
</ul>
<h3>第三方与开源</h3>
<p>从 GitHub Releases、酷安、Google Play 等渠道下载时，该渠道可能有自己的下载与账号政策。应用依赖的开源库按其许可证使用；我们不会借此引入追踪类服务。</p>
<p>本介绍网站 etais.dev 使用 Cloudflare Web Analytics 统计访问（与各 Android APK 内的数据处理无关）。</p>
<h3>政策变更</h3>
<p>若本政策有实质变更，我们会更新本页的生效日期，并在合理范围内通过官网或应用更新说明提示。</p>
<h3>联系方式</h3>
<p>如有隐私相关问题，请通过官网 <a href="https://etais.dev/">https://etais.dev/</a> 或对应 GitHub 仓库的 Discussions / Issues 联系发布者。</p>
`;

export const privacyBodyEn = `
<p class="privacy-lead"><strong>In one sentence:</strong> These apps are <strong>offline, account-free, and server-free</strong>. By default we do not collect or upload personal information. Data stays on your device; files leave the phone only when you export, share, or back them up yourself.</p>
<p><strong>Effective date:</strong> 2026-10-13 · <strong>Publisher:</strong> Ch Etang (Etai Apps)</p>
<h3>Who we are</h3>
<p>Etai Apps is a personal developer’s set of open-source Android apps. Website: <a href="https://etais.dev/en/">https://etais.dev/</a>. Source code is on GitHub (c-week, easy-ledger, group-matters).</p>
<h3>What data we process</h3>
<h4>1. In-app data (on-device only)</h4>
<ul>
  <li><strong>C Week:</strong> Learning progress, mistake book, language and theme preferences</li>
  <li><strong>Easy Ledger:</strong> Ledger entries, categories, notes, receipt images (if you add them), UI preferences</li>
  <li><strong>Group Matters:</strong> Groups and members, activity progress, group-fund ledger, payment proof images (if you add them), UI preferences</li>
</ul>
<p>This data is stored in the app’s local storage and is <strong>not</strong> synced to a cloud service we operate.</p>
<h4>2. Content you export or share</h4>
<p>When you use backup, export, copy, or share features, the app may create zip, CSV, text, or image files. Those files appear only where you choose to save or send them. We do not upload them for you.</p>
<h4>3. What we do not collect</h4>
<ul>
  <li>No sign-up or sign-in</li>
  <li>No identity data such as name, phone number, email, or ID numbers for our services</li>
  <li>No ad SDKs, analytics SDKs, or crash-reporting SDKs (as reflected in each release’s manifest and dependencies)</li>
  <li>Each app’s <strong>main manifest does not declare INTERNET</strong>. The merged install manifest may include permissions such as <code>ACCESS_NETWORK_STATE</code> from libraries (see Permissions below). Normal use does not require a network; we have no backend that receives your app data</li>
</ul>
<h3>Permissions</h3>
<p>Each app requests only permissions needed for its features. The following reflects each app’s <strong>main manifest and typical merged results</strong>; <strong>see your device’s install prompt for the exact list</strong>:</p>
<ul>
  <li><strong>C Week:</strong> No INTERNET in the main manifest. The merged manifest may include <code>ACCESS_NETWORK_STATE</code> from Media3 libraries (network-state detection only; we do not upload learning data). Lessons and demo videos ship inside the APK.</li>
  <li><strong>Easy Ledger:</strong> The main manifest declares <strong>no INTERNET and no CAMERA permission</strong>. It only declares optional hardware <code>android.hardware.camera</code> (<code>required=false</code>). Receipt photos use the <strong>system camera or photo picker</strong> when you choose; we do not scan your gallery in the background. The merged install manifest may include notifications, media/storage read, or home-screen widget capabilities for backup, sharing, and widgets—see your device’s install prompt.</li>
  <li><strong>Group Matters:</strong> The main manifest declares <strong>no uses-permission entries</strong> (no INTERNET, no camera permission, etc.). Widgets, backup, and sharing use standard OS mechanisms and FileProvider. See the merged install prompt on your device for the exact list.</li>
</ul>
<p>We do not request unrelated sensitive permissions. See each repository’s manifest and your device’s install screen for details.</p>
<h3>Children</h3>
<p>We do not direct these apps at children or collect children’s data for our services. Because data stays on-device with no accounts, a parent or guardian can manage or uninstall the app on the device.</p>
<h3>Security and device changes</h3>
<ul>
  <li>On-device security depends mainly on your lock screen and system settings</li>
  <li>Uninstalling usually deletes app data; back up before reinstalling or switching phones</li>
  <li>Release-signed builds may not overwrite older debug or differently signed builds; uninstalling to fix a signature conflict deletes local data unless you backed up first</li>
</ul>
<h3>Third parties and open source</h3>
<p>Download stores (GitHub Releases, Coolapk, Google Play, etc.) have their own policies separate from how data is handled inside the apps. Open-source libraries are used under their licenses; we do not use them to add tracking services.</p>
<p>The etais.dev website uses Cloudflare Web Analytics (separate from data handling inside the Android apps).</p>
<h3>Changes</h3>
<p>If this policy changes in a material way, we will update the effective date on this page and note it in release notes or on the website where practical.</p>
<h3>Contact</h3>
<p>For privacy questions, contact the publisher via <a href="https://etais.dev/en/">https://etais.dev/</a> or Discussions / Issues on the relevant GitHub repository.</p>
`;
