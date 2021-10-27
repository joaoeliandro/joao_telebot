import { app, bot } from "./app";

bot.launch();

app.listen(3333, () => {
  console.log(`Server started on port 3333`);
});
