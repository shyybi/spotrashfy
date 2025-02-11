const voiceTimes = new Map();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateVoiceDuration(userId, username, timeSpent) {
  const session = { date: new Date(), duration: timeSpent };
  try {
    const userRecord = await prisma.voiceDuration.findUnique({
      where: { userId: userId }
    });

    if (userRecord) {
      console.log(`Updating user ${userId} with new session`);
      await prisma.voiceDuration.update({
        where: { userId: userId },
        data: {
          totalDuration: { increment: timeSpent },
          sessions: { set: [...userRecord.sessions, session] }
        }
      });
    } else {
      console.log(`Creating new record for user ${userId}`);
      await prisma.voiceDuration.create({
        data: {
          userId: userId,
          username: username,
          totalDuration: timeSpent,
          sessions: [session]
        }
      });
    }
    console.log(`Successfully updated/created record for user ${userId}`);
  } catch (error) {
    console.error(`Error updating/creating record for user ${userId}:`, error);
  }
}

module.exports = {
  name: 'voiceStateUpdate',
  once: false,
  async execute(oldState, newState) {
    const userId = oldState.id;
    const username = oldState.member.user.username;
    const now = Date.now();

    if (!oldState.channelId && newState.channelId) {
      console.log(`User ${username} / ${userId} joined voice channel ${newState.channelId} at ${new Date(now).toLocaleString()}`);
      voiceTimes.set(userId, now);
    } else if (oldState.channelId && !newState.channelId) {
      if (voiceTimes.has(userId)) {
        const joinTime = voiceTimes.get(userId);
        const timeSpent = now - joinTime;
        console.log(`User ${username} / ${userId} left voice channel ${oldState.channelId} at ${new Date(now).toLocaleString()}`);
        console.log(`User ${username} / ${userId} spent ${timeSpent / 1000} seconds in the voice channel.`);
        voiceTimes.delete(userId);

        await updateVoiceDuration(userId, username, timeSpent);
      }
    }
  },
};


