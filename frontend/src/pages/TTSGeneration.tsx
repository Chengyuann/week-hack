import { useState, useEffect } from 'react';
import { Card, Input, Select, Button, message, Space } from 'antd';
import { SoundOutlined, DownloadOutlined } from '@ant-design/icons';
import { generateTTS } from '../api/tts';
import { listVoices, type Voice } from '../api/voices';

const { TextArea } = Input;
const { Option } = Select;

const TTSGeneration = () => {
  const [voices, setVoices] = useState<Voice[]>([]);
  const [selectedVoiceId, setSelectedVoiceId] = useState<string>('');
  const [model, setModel] = useState('step-tts-mini');
  const [inputText, setInputText] = useState('');
  const [generating, setGenerating] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audioBase64, setAudioBase64] = useState<string | null>(null);

  useEffect(() => {
    loadVoices();
  }, []);

  const loadVoices = async () => {
    try {
      const response = await listVoices();
      if (response.success) {
        setVoices(response.data.voices);
      }
    } catch (error) {
      console.error('加载角色列表失败:', error);
    }
  };

  const handleGenerate = async () => {
    if (!selectedVoiceId) {
      message.error('请选择Voice');
      return;
    }
    if (!inputText.trim()) {
      message.error('请输入文本');
      return;
    }

    setGenerating(true);
    try {
      const response = await generateTTS({
        voiceId: selectedVoiceId,
        input: inputText,
        model,
      });

      if (response.success) {
        if (response.data.audioUrl) {
          setAudioUrl(response.data.audioUrl);
        }
        if (response.data.audioBase64) {
          setAudioBase64(response.data.audioBase64);
        }
        message.success('生成成功！');
      }
    } catch (error: any) {
      message.error(error.message || '生成失败');
    } finally {
      setGenerating(false);
    }
  };

  const handleDownload = () => {
    if (audioUrl) {
      window.open(audioUrl, '_blank');
    } else if (audioBase64) {
      const link = document.createElement('a');
      link.href = `data:audio/mp3;base64,${audioBase64}`;
      link.download = 'tts-output.mp3';
      link.click();
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <Card title="TTS音频生成">
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <div style={{ marginBottom: '8px' }}>选择Voice</div>
            <Select
              value={selectedVoiceId}
              onChange={setSelectedVoiceId}
              style={{ width: '100%' }}
              placeholder="请选择语音角色"
              showSearch
              filterOption={(input, option) =>
                (option?.children as string)?.toLowerCase().includes(input.toLowerCase())
              }
            >
              {voices.map((voice) => (
                <Option key={voice.id} value={voice.id}>
                  {voice.id.slice(0, 8)}... ({voice.model})
                </Option>
              ))}
            </Select>
          </div>

          <div>
            <div style={{ marginBottom: '8px' }}>模型选择</div>
            <Select value={model} onChange={setModel} style={{ width: '100%' }}>
              <Option value="step-tts-2">step-tts-2</Option>
              <Option value="step-tts-mini">step-tts-mini</Option>
              <Option value="step-tts-vivid">step-tts-vivid</Option>
              <Option value="step-audio-2">step-audio-2</Option>
            </Select>
          </div>

          <div>
            <div style={{ marginBottom: '8px' }}>输入文本</div>
            <TextArea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="请输入要转换为语音的文本"
              rows={6}
            />
          </div>

          <Button
            type="primary"
            size="large"
            icon={<SoundOutlined />}
            onClick={handleGenerate}
            loading={generating}
            block
          >
            生成音频
          </Button>

          {(audioUrl || audioBase64) && (
            <Card title="生成结果">
              <audio
                controls
                style={{ width: '100%', marginBottom: '16px' }}
                src={audioUrl || `data:audio/mp3;base64,${audioBase64}`}
              />
              <Button icon={<DownloadOutlined />} onClick={handleDownload}>
                下载音频
              </Button>
            </Card>
          )}
        </Space>
      </Card>
    </div>
  );
};

export default TTSGeneration;



