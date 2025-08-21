import figlet from "figlet";
import chalk from "chalk";

figlet.text("DOSYAHUB", { font: "Slant" }, function (err, data) {
  if (err) {
    console.log("ASCII art oluşturulamadı!");
    return;
  }
  console.log(chalk.green(data));
  console.log(chalk.cyan("✅ DosyaHub başarıyla çalışıyor.\n"));
});
